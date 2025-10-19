export interface User {
  email: string;
  name: string;
}

export interface AuthResponseData {
  access_token: string;
  user: User;
}
