export const kApplicationStatus = {
  submitted: "Submitted",
  approvedForInterview: "Approved For Interview",
  declined: "Declined"
} as const

export type ApplicationStatus = typeof kApplicationStatus[keyof typeof kApplicationStatus];
