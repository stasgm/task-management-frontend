import { TaskDTO } from './dto/task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

const serverUrl = 'http://localhost:3000';

export class TaskAPI {
  public static async getAll(): Promise<TaskDTO[]> {
    const resp = await fetch(`${serverUrl}/tasks`, {
      method: 'GET',
    });

    const data = await resp.json();

    return data;
  }

  public static async createOne(createRequest: CreateTaskDTO) {
    const resp = await fetch(`${serverUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createRequest),
    });

    const data = await resp.json();

    return data;
  }

  public static async deleteOne(taskId: string) {
    await fetch(`${serverUrl}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  public static async updateOne(taskId: string, updateRequest: UpdateTaskDTO) {
    const resp = await fetch(`${serverUrl}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateRequest),
    });

    const data = await resp.json();

    return data;
  }
}
