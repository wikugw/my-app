import { kApplicationStatus } from '@/constants/application-status';
import { showFeedback } from '@/store/feedbackSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateApplication } from './useUpdateApplication';
import { useNav } from '../useNav';
import { handleSendInvitation } from '@/helpers/email/sendInterviewHelper';
import type { MatchedApplication } from './useRecruitmentForm';

export function useRecruitmentFlow() {
  const dispatch = useDispatch();
  const [application, setApplication] = useState<MatchedApplication>(
    {} as MatchedApplication
  );
  const updateApplicationStatus = useUpdateApplication();
  const { back } = useNav();
  const [positionName, setPositionName] = useState<string>('');

  const handleSuccessAction = (successMessage: string) => {
    dispatch(
      showFeedback({
        type: 'success',
        message: successMessage,
        onConfirm: () => {
          back();
        },
      })
    );
  };

  const handleFailureAction = (failureMessage: string, error: Error) => {
    console.error('Error updating application status:', error);
    dispatch(
      showFeedback({
        type: 'failure',
        message: failureMessage,
      })
    );
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
