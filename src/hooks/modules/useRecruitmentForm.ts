import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { fetchRecruitmentById } from '@/api-client/firebase/recruitment';
import {
  recruitmentFormSchema,
  type RecrutmentFormInputs,
} from '@/validations/modules/recruitment-form';
import type { RecruitmentFormType } from '@/types/modules/Recruitment';
import { useNav } from '../useNav';
import { fetchApplicationsByRecruitmentIdAndStatus } from '@/api-client/firebase/application';
import type { ApplicationPreviewEntity } from '@/types/modules/Application';
import Fuse from 'fuse.js';
import { useCurrentUser } from '../useCurrentUser';
import { kApplicationStatus } from '@/constants/application-status';
import { showError, showSuccess } from '@/helpers/swalHelper';
import { useCreateRecruitment } from './recruitment/useCreateRecruitment';
import { parseDateString } from '@/helpers/dateFormat';

export type MatchedApplication = ApplicationPreviewEntity & {
  match: number;
};

export function useRecruitmentForm(id?: string) {
  const { employeeInfo } = useCurrentUser();
  const { back } = useNav();
  const createRecruitment = useCreateRecruitment();

  // Query Firestore when `id` is available
  const {
    data,
    isLoading: isGetRecruitmentLoading,
    error: getRecruitmentError,
  } = useQuery({
    queryKey: ['recruitment', id],
    queryFn: () => fetchRecruitmentById(id!),
    enabled: !!id,
  });

  const {
    data: applications,
    isLoading: isGetApplicationsLoading,
    error: getApplicationsError,
  } = useQuery({
    queryKey: ['applications', id],
    queryFn: () =>
      fetchApplicationsByRecruitmentIdAndStatus(
        id!,
        kApplicationStatus.submitted
      ),
    enabled: !!id,
  });

  const methods = useForm<RecrutmentFormInputs>({
    resolver: yupResolver(recruitmentFormSchema),
    defaultValues: { requirements: [''] },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedValues = useWatch({ control: methods.control });

  useEffect(() => {
    if (data) {
      methods.reset({
        ...data,
        applicationDates: [
          parseDateString(data.applicationDates[0]),
          parseDateString(data.applicationDates[1]),
        ]
      });
    }
  }, [data, methods]);

  const onSuccessConfirm = () => {
    back();
  };

  const onSubmit = async (formData: RecrutmentFormInputs) => {
    try {
      const payload: RecruitmentFormType = {
        ...formData,
        applicationDates: formData.applicationDates?.map(d =>
          d ? new Date(d) : null
        ),
        createdById: employeeInfo?.id ?? -1,
      };
      if (id) {
        // 🔹 UPDATE EXISTING DOCUMENT
        createRecruitment.mutate(payload);
        // updateDocument('recruitments', id, payload);
        showSuccess('Data updated successfully').then(() => {
          onSuccessConfirm();
        });
      } else {
        // 🔹 ADD NEW DOCUMENT
        createRecruitment.mutate(payload, {
          onSuccess: () => {
            showSuccess('Data saved successfully').then(() => {
              onSuccessConfirm();
            });
          },
        });
      }
    } catch (e) {
      console.error('Error adding document:', e);
      showError('Failed to save data', (e as Error).message);
    }
  };

  const isLoading = useMemo(
    () => isGetApplicationsLoading || isGetRecruitmentLoading,
    [isGetApplicationsLoading, isGetRecruitmentLoading]
  );

  const error = useMemo(
    () => getApplicationsError || getRecruitmentError,
    [getApplicationsError, getRecruitmentError]
  );

  const sortedApplications = useMemo(() => {
    if (!applications?.length) return [];
    if (!data?.id) return [];

    const normalize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim();

    const normalizedRequirements = data.requirements.map(normalize);

    const matched = applications.map((app): MatchedApplication => {
      const normalizedSkills = app.skills.map(normalize);

      // Fuse for fuzzy matching of requirements to skills
      const fuse = new Fuse(normalizedSkills, {
        includeScore: true,
        threshold: 0.4, // lower = stricter match
        distance: 100,
      });

      // Aggregate match score
      const totalScore = normalizedRequirements.reduce((sum, req) => {
        const bestMatch = fuse.search(req)[0];
        const score = bestMatch ? 1 - (bestMatch.score ?? 1) : 0;
        return sum + score;
      }, 0);

      const match = Math.round(
        (totalScore / normalizedRequirements.length) * 100
      );

      return {
        ...app,
        match,
      };
    });

    return matched.sort((a, b) => b.match - a.match);
  }, [applications, data?.requirements, data?.id]);

  return {
    methods,
    watchedValues,
    isLoading,
    error,
    sortedApplications,
    onSubmit,
  };
}
