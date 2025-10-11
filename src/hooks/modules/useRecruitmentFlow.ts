import { kApplicationStatus, type ApplicationStatus } from "@/constants/application-status";
import { showFeedback } from "@/store/feedbackSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateApplication } from "./useUpdateApplication";
import { useNav } from "../useNav";

export function useRecruitmentFlow() {
  const dispatch = useDispatch();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const updateApplicationStatus = useUpdateApplication();
  const { back } = useNav();

  const confirmAction = (type: ApplicationStatus) => {
    const nextAction = type === kApplicationStatus.approvedForInterview ? proceedToInterview : declineApplication;
    const message = type === kApplicationStatus.approvedForInterview
      ? "Are you sure you want to proceed to the interview stage?"
      : "Are you sure you want to decline this application?";
    dispatch(
      showFeedback({
        type: 'warning',
        message: message,
        onConfirm: nextAction,
      })
    );
  }

  const handleSuccessAction = (successMessage: string,) => {
    dispatch(
      showFeedback({
        type: 'success',
        message: successMessage,
        onConfirm: () => {
          back();
        },
      })
    );
  }

  const handleFailureAction = (failureMessage: string, error: Error) => {
    console.error("Error updating application status:", error);
    dispatch( 
      showFeedback({
        type: 'failure',
        message: failureMessage,
      })
    );
  }

  const proceedToInterview = () => {
    updateApplicationStatus.mutate({
      applicationId: applicationId!,
      status: kApplicationStatus.approvedForInterview
    }, {
      onSuccess: () => {
        handleSuccessAction('Application has been moved to interview stage.');
      },
      onError: (error) => {
        console.error("Error updating application status:", error);
        handleFailureAction('Failed to update application status. Please try again.', error);
      }
    });
  }

  const declineApplication = () => {
    updateApplicationStatus.mutate({
      applicationId: applicationId!,
      status: kApplicationStatus.declined
    }, {
      onSuccess: () => {
        handleSuccessAction('Application has been declined.');
      },
      onError: (error) => {
        console.error("Error declining application:", error);
        handleFailureAction('Failed to decline application. Please try again.', error);
      }
    });
  }

  return {
    proceedToInterview,
    declineApplication,
    confirmAction,
    setApplicationId
  };
}
