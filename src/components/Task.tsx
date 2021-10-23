import React from 'react';

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import { Container, Chip } from '@material-ui/core';

import { TaskDTO, TaskStatus } from '../api/dto/task.dto';
import { TaskAPI } from '../api/task.api';

interface Props {
  data: TaskDTO;
  onTaskDelete: (taskId: string) => void;
  onTaskUpdate: (task: TaskDTO) => void;
}

const Task = ({ data, onTaskDelete, onTaskUpdate }: Props) => {
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
    <div />
    /*   <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {data.title}
        </Typography>
        <Typography variant="body2" component="p">
          {data.description}
        </Typography>

        <Chip
          label={getTaskStatusToString(data.status)}
          style={{
            backgroundColor: getTaskStatusColor(data.status),
            color: 'white',
          }}
        />
      </CardContent>
      <CardActions>
        <Container>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ marginLeft: 5 }}
            onClick={() => onTaskUpdate(data)}
          >
            Edit
          </Button>
          <Button size="small" variant="contained" color="secondary" style={{ marginLeft: 5 }} onClick={deleteTask}>
            Delete
          </Button>
        </Container>
      </CardActions>
    </Card> */
  );
};

export default Task;
