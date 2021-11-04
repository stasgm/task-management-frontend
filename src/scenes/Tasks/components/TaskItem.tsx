import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { TaskDTO, TaskStatus } from '../../../api/dto/task.dto';
import { TaskAPI } from '../../../api/task.api';

import theme from '../../../styles/theme';

interface Props {
  data: TaskDTO;
  onTaskDelete: (taskId: string) => void;
  onTaskUpdate: (task: TaskDTO) => void;
}

const TaskItem = ({ data, onTaskDelete, onTaskUpdate }: Props) => {
  const deleteTask = async () => {
    await TaskAPI.deleteOne(data.id);
    onTaskDelete(data.id);
  };

  const getTaskStatusToString = (status: TaskStatus) => {
    let text = '';

    switch (status) {
      case TaskStatus.OPEN:
        text = 'Created';
        break;
      case TaskStatus.IN_PROGRESS:
        text = 'In Progress';
        break;
      case TaskStatus.DONE:
        text = 'Done';
        break;
      default:
        text = '';
    }

    return text;
  };

  const getTaskStatusColor = (status: TaskStatus) => {
    let color = '';

    switch (status) {
      case TaskStatus.OPEN:
        color = 'gray';
        break;
      case TaskStatus.IN_PROGRESS:
        color = 'orange';
        break;
      case TaskStatus.DONE:
        color = 'green';
        break;
      default:
        color = '';
    }

    return color;
  };

  return (
    <TableRow
      key={data.id}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <TableCell>{data.title}</TableCell>
      <TableCell>{data.description}</TableCell>
      <TableCell>{data.status}</TableCell>
    </TableRow>
  );
};

export default TaskItem;
