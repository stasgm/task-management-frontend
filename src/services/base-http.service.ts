import axios, { AxiosError } from 'axios';

const serverUrl =
  process.env.REACT_APP_ENV?.trim() === 'prod'
    ? 'https://task-management-app-back.herokuapp.com'
    : process.env.REACT_APP_ENV?.trim() === 'dev'
    ? 'https://dev-task-management-app-back.herokuapp.com/api/v1'
    : 'http://localhost:3000';

console.log('REACT_APP_ENV', process.env.REACT_APP_ENV?.trim());
console.log('serverUrl', serverUrl);

export default abstract class BaseHttpService {
  protected BASE_URL = serverUrl;
  private _accessToken: string | null = null;

  protected async get<T>(endpoint: string, options = {}): Promise<T | void> {
    try {
      const res = await axios.get<T>(`${this.BASE_URL}/${endpoint}`, { ...options, ...this.getCommonOptions() });
      return res.data;
    } catch (error) {
      this.handleHttpError(error as AxiosError);
    }
  }

  protected async post<T>(endpoint: string, data = {}, options = {}): Promise<T | void> {
    try {
      const res = await axios.post<T>(`${this.BASE_URL}/${endpoint}`, data, { ...options, ...this.getCommonOptions() });
      return res.data;
    } catch (error) {
      this.handleHttpError(error as AxiosError);
    }
  }

  protected async delete<T>(endpoint: string, options = {}): Promise<void> {
    try {
      await axios.delete<T>(`${this.BASE_URL}/${endpoint}`, { ...options, ...this.getCommonOptions() });
    } catch (error) {
      this.handleHttpError(error as AxiosError);
    }
  }

  protected async patch<T>(endpoint: string, data = {}, options = {}): Promise<T | void> {
    try {
      const res = await axios.patch<T>(`${this.BASE_URL}/${endpoint}`, data, {
        ...options,
        ...this.getCommonOptions(),
      });
      return res.data;
    } catch (error) {
      this.handleHttpError(error as AxiosError);
    }
  }

  protected handleHttpError(error: AxiosError) {
    const { statusCode } = error.response?.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      return this.handle401();
    }
  }

  protected handle401() {
    window.location.hash = '/signin';
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
