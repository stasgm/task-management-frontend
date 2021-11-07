import axios from 'axios';

import BaseHttpService from '../base-http.service';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

export default class AuthService extends BaseHttpService {
  async signin(username: string, password: string): Promise<AuthResponseDto> {
    const result = await axios.post<AuthResponseDto>(`${this.BASE_URL}/auth/signin`, { username, password });
    const accessToken = result.data.access_token;
    this.saveToken(accessToken);
    return result.data;
  }

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    const result = await axios.post<AuthResponseDto>(`${this.BASE_URL}/auth/signup`, authCredentialsDto);
    const accessToken = result.data.access_token;
    this.saveToken(accessToken);
    return result.data;
  }

  async signout() {
    this.removeToken();
  }
}
