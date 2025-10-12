import { kApplicationStatus } from '@/constants/application-status';
import { useState } from 'react';
import { useUpdateApplication } from './useUpdateApplication';
import { useNav } from '../useNav';
import { handleSendInvitation } from '@/helpers/email/sendInterviewHelper';
import type { MatchedApplication } from './useRecruitmentForm';
import { showError, showSuccess } from '@/helpers/swalHelper';
import { handleSendRejection } from '@/helpers/email/sendRejectionHelper';

export function useRecruitmentFlow() {
  const [application, setApplication] = useState<MatchedApplication>(
    {} as MatchedApplication
  );
  const updateApplicationStatus = useUpdateApplication();
  const { back } = useNav();
  const [positionName, setPositionName] = useState<string>('');

  const handleSuccessAction = (successMessage: string) => {
    showSuccess(successMessage).then(() => {
      back();
    });
  };

  const handleFailureAction = (failureMessage: string, error: Error) => {
    console.error('Error updating application status:', error);
    showError(failureMessage);
  };

  const proceedToInterview = () => {
    console.log(application.id, positionName);
    updateApplicationStatus.mutate(
      {
        applicationId: application.id,
        status: kApplicationStatus.approvedForInterview,
      },
      {
        onSuccess: () => {
          handleSendInvitation({
            name: application?.name || 'Candidate',
            email: application?.email || 'candidate@example.com',
            position: positionName || 'the position',
            date: '2023-10-01', // Example date, replace with actual date
            time: '10:00 AM (GMT+7)', // Example time, replace with actual time
            meet_url: 'https://meet.google.com/xyz-abcd-efg', // Example URL, replace with actual meeting URL
          });
          handleSuccessAction('Application has been moved to interview stage.');
        },
        onError: error => {
          console.error('Error updating application status:', error);
          handleFailureAction(
            'Failed to update application status. Please try again.',
            error
          );
        },
      }
    );
  };

  const declineApplication = () => {
    updateApplicationStatus.mutate(
      {
        applicationId: application.id,
        status: kApplicationStatus.declined,
      },
      {
        onSuccess: () => {
          handleSendRejection({
            name: application?.name || 'Candidate',
            email: application?.email || 'candidate@example.com',
            position: positionName || 'the position',
          });
          handleSuccessAction('Application has been declined.');
        },
        onError: error => {
          console.error('Error declining application:', error);
          handleFailureAction(
            'Failed to decline application. Please try again.',
            error
          );
        },
      }
    );
  };

  return {
    application,
    proceedToInterview,
    declineApplication,
    setApplication,
    setPositionName,
  };
}
