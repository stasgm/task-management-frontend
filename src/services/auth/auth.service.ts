import BaseHttpService, { INetworkError, IErrorMessage } from '../base-http.service';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

export interface IAuthQueryResponse {
  type: 'SIGNUP' | 'SIGNIN';
}

export interface ISignUpResponse extends IAuthQueryResponse {
  type: 'SIGNUP';
}

export interface ISignInResponse extends IAuthQueryResponse {
  type: 'SIGNUP';
}

export type QueryResponse = ISignUpResponse | ISignInResponse;

class AuthService extends BaseHttpService {
  async signin(authCredentialsDto: AuthCredentialsDto): Promise<ISignInResponse | INetworkError> {
    try {
      const result = await this.post<AuthResponseDto>('auth/signin', authCredentialsDto);

      if (!result.success) {
        return {
          type: 'ERROR',
          message: 'unknown error',
        } as INetworkError;
      }

      const accessToken = result.data.access_token;
      this.saveToken(accessToken);

      return {
        type: 'SIGNUP',
      } as ISignInResponse;
    } catch (err) {
      return {
        type: 'ERROR',
        message: err || 'ошибка создания пользователя',
      } as INetworkError;
    }
  }

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<ISignUpResponse | INetworkError> {
    try {
      const result = await this.post<AuthResponseDto>('auth/signup', authCredentialsDto);

      if (!result.success) {
        const message = (result.data as IErrorMessage).error || 'unknown error';
        return {
          type: 'ERROR',
          message,
        } as INetworkError;
      }

      const accessToken = result.data.access_token;
      this.saveToken(accessToken);

      return {
        type: 'SIGNUP',
      } as ISignInResponse;
    } catch (err) {
      return {
        type: 'ERROR',
        message: err || 'ошибка создания пользователя',
      } as INetworkError;
    }
  }

  async signout() {
    this.removeToken();
  }
}

export default new AuthService();
