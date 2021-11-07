import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

import TasksService from '../../../services/tasks/tasks.service';
import { TaskDto, TaskStatus } from '../../../services/tasks/dto/task.dto';

import '../styles.css';

const CreateTask = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [id, setId] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.OPEN);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchById(id: string) {
      try {
        const resp = await TasksService.getById(id);

        if (resp) {
          setId(resp.id);
          setStatus(resp.status);
          setTitle(resp.title);
          setDescription(resp.description);
        }
      } catch (e) {
        console.error('error: ', e);
      }
    }

    if (params.id) {
      fetchById(params.id);
    }
  }, [params]);

  const handleClose = () => navigate('/');

  const createTask = async () => {
    try {
      const resp = await TasksService.createTask({
        title,
        description,
      });

      if (resp) {
        handleClearTask();
        handleClose();
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const updateTask = async () => {
    if (!id) return;

    try {
      const task: TaskDto = {
        id,
        title,
        description,
        status,
      };

      const resp = await TasksService.updateById(id, task);

      if (resp) {
        console.log('Task updated', resp);
        handleClearTask();
        handleClose();
      } else {
        console.log('Task is not updated', resp);
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const handleClearTask = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <div className="edit-block">
      <TextField
        placeholder="Title"
        variant="outlined"
        className="text-field"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        placeholder="Description"
        variant="outlined"
        className="text-field"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="buttons">
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={id ? updateTask : createTask}
          className="button"
        >
          {id ? 'Update' : 'Add new'} task
        </Button>
        <Button color="secondary" size="small" variant="contained" onClick={handleClearTask} className="button">
          Clear
        </Button>
        <Button color="secondary" size="small" variant="contained" onClick={handleClose} className="button">
          Close
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
