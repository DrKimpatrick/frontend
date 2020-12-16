import jwtDecode from 'jwt-decode';

export type DecodedToken = {
  readonly userId: string;
  readonly roles: string[];
  readonly iat: number;
  readonly exp: number;
};

export default class AuthToken {
  readonly decoded: DecodedToken;

  constructor(readonly token?: string) {
    this.decoded = {
      userId: '',
      roles: [''],
      iat: 0,
      exp: 0
    };

    try {
      if (token) this.decoded = jwtDecode(token);
    } catch (e) {
      // TODO: Log to error tracking
    }
  }

  get expiresAt(): Date {
    return new Date(this.decoded.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isAuthenticated(): boolean {
    return !this.isExpired;
  }

  get bearerString() {
    return `Bearer ${this.token}`;
  }
}

export const getAccessToken = () => {
  return localStorage.getItem('token');
};
