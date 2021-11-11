import axios, { AxiosError } from 'axios';

const appEnv = process.env.REACT_APP_ENV?.trim() || 'local-dev';

const serverUrl =
  appEnv === 'prod'
    ? 'https://task-management-app-back.herokuapp.com'
    : appEnv === 'dev'
    ? 'https://dev-task-management-app-back.herokuapp.com/api/v1'
    : 'http://localhost:3000/api/v1';

const appBaseUrl = process.env.REACT_APP_BASE_URL?.trim();

console.log('REACT_APP_BASE_URL', appBaseUrl);
console.log('REACT_APP_ENV', appEnv);
console.log('serverUrl', serverUrl);
console.log('baseUrl', appBaseUrl ? appBaseUrl : serverUrl);

interface IApiResponse<T> {
  success: boolean;
  data: T;
}

export interface IErrorMessage {
  error: string;
  message?: string[];
}

interface IApiErrorResponse extends IApiResponse<IErrorMessage> {
  success: false;
}

export interface INetworkError {
  type: 'ERROR';
  message: string;
}

export default abstract class BaseHttpService {
  protected BASE_URL = appBaseUrl ? appBaseUrl : serverUrl;
  private _accessToken: string | null = null;

  protected async get<T>(endpoint: string, options = {}): Promise<IApiResponse<T> | IApiErrorResponse> {
    try {
      const res = await axios.get<T>(`${this.BASE_URL}/${endpoint}`, { ...options, ...this.getCommonOptions() });
      return { success: true, data: res.data };
    } catch (error) {
      return this.handleHttpError(error as AxiosError);
    }
  }

  protected async post<T>(endpoint: string, data = {}, options = {}): Promise<IApiResponse<T> | IApiErrorResponse> {
    try {
      const res = await axios.post<T>(`${this.BASE_URL}/${endpoint}`, data, { ...options, ...this.getCommonOptions() });
      return { success: true, data: res.data };
    } catch (error) {
      return this.handleHttpError(error as AxiosError);
    }
  }

  protected async delete<T>(endpoint: string, options = {}): Promise<IApiResponse<T> | IApiErrorResponse> {
    try {
      const res = await axios.delete<T>(`${this.BASE_URL}/${endpoint}`, { ...options, ...this.getCommonOptions() });
      return { success: true, data: res.data };
    } catch (error) {
      return this.handleHttpError(error as AxiosError);
    }
  }

  protected async patch<T>(endpoint: string, data = {}, options = {}): Promise<IApiResponse<T> | IApiErrorResponse> {
    try {
      const res = await axios.patch<T>(`${this.BASE_URL}/${endpoint}`, data, {
        ...options,
        ...this.getCommonOptions(),
      });
      return { success: true, data: res.data };
    } catch (error) {
      return this.handleHttpError(error as AxiosError);
    }
  }

  protected handleHttpError(error: AxiosError) {
    const { statusCode } = error.response?.data;

    if (statusCode === 401) {
      return this.handle401();
    } else if (statusCode === 400) {
      return { success: false, data: error.response?.data } as IApiErrorResponse;
    } else {
      throw error;
    }
  }

  protected handle401(): IApiErrorResponse {
    window.location.replace('/login');
    return { success: false, data: { error: 'No permissions' } };
  }

  protected getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken();
  }

  protected saveToken(accessToken: string) {
    this._accessToken = accessToken;
    return localStorage.setItem('accessToken', accessToken);
  }

  protected loadToken() {
    const token = localStorage.getItem('accessToken');
    this._accessToken = token;
    return token;
  }

  protected removeToken() {
    localStorage.removeItem('accessToken');
  }
}
