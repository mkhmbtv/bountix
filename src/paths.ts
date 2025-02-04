export const homePath = () => "/";

export const dashboardPath = () => "/dashboard";
export const ticketsPath = () => "/dashboard/tickets";
export const ticketPath = (ticketId: string) =>
  `/dashboard/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) =>
  `/dashboard/tickets/${ticketId}/edit`;
export const accountProfilePath = () => "/dashboard/account/profile";
export const accountPasswordPath = () => "/dashboard/account/password";

export const signUpPath = () => "/sign-up";
export const signInPath = () => "/sign-in";
export const passwordForgotPath = () => "/password-forgot";
