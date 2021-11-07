import queryString from 'query-string';

import BaseHttpService from '../base-http.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface ISearchFilter {
  status?: string;
  search?: string;
}

class TasksService extends BaseHttpService {
  fetchTasks(searchFilter: ISearchFilter = {}) {
    const queryObj: ISearchFilter = {};
    const { status, search } = searchFilter;

    if (status?.length) {
      queryObj.status = status;
    }

    if (search?.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get<TaskDto[]>('tasks' + (queryStr ? `?${queryStr}` : ''));
  }

  getById(id: string) {
    return this.get<TaskDto>(`tasks/${id}`);
  }

  async deleteById(id: string): Promise<void> {
    await this.delete(`tasks/${id}`);
  }

  updateById(id: string, updateTaskDto: UpdateTaskDto) {
    return this.patch<TaskDto>(`tasks/${id}`, updateTaskDto);
  }

  createTask(createTaskDto: CreateTaskDto) {
    return this.post<TaskDto>('tasks', createTaskDto);
  }
}

export default new TasksService();
