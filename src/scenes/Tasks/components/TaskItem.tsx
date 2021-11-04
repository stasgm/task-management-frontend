import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { TaskDTO, TaskStatus } from '../../../api/dto/task.dto';

import theme from '../../../styles/theme';

interface Props {
  data: TaskDTO;
  onTaskDelete: (taskId: string) => void;
  onTaskUpdate: () => void;
}

const TaskItem = ({ data, onTaskDelete, onTaskUpdate }: Props) => {
  const navigate = useNavigate();

  const handleDeleteTask = async (id: string) => {
    onTaskDelete(data.id);
  };

  const handleEditTask = useCallback((id) => navigate(id), [navigate]);

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

  const EditActonIcon = ({ id }: { id: string }) => (
    <IconButton onClick={() => handleEditTask(id)}>
      <EditIcon />
    </IconButton>
  );

  const DeleteActionIcon = ({ id }: { id: string }) => (
    <IconButton onClick={() => handleDeleteTask(id)}>
      <DeleteIcon color="action" />
    </IconButton>
  );

  return (
    <>
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
        <TableCell>{getTaskStatusToString(data.status)}</TableCell>
        <TableCell>
          <EditActonIcon id={data.id} />
          <DeleteActionIcon id={data.id} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TaskItem;
