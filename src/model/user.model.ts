export class RegisterUserRequest {
  username: string;
  password: string;
  email: string;
  user_agent: string;
  token: string;
}

export class UserResponse {
  username: string;
  email: string;
  token?: string;
}

export class LoginUserRequest {
  username?: string;
  email?: string;
  password: string;
}

export class UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}
