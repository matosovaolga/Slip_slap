export interface ILogin {
  username: string;
  password: string;
}

export interface TokenResponse {
	access_token: string;
	refresh_token: string
}