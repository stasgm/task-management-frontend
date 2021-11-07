import { UserDto } from './user.dto';

export interface AuthResponseDto {
  access_token: string;
  user: UserDto;
}
