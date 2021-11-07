import { TaskStatus } from './task.dto';

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
