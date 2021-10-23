import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { TaskAPI } from '../api/task.api';
import { TaskDTO } from '../api/dto/task.dto';

import './CreateTask.css';

interface Props {
  onTaskCreated: (task: TaskDTO) => void;
}

const CreateTaskModal = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<undefined | string>(undefined);

  const createTask = async () => {
    const resp = await TaskAPI.createOne({
      title,
      description,
    });

    props.onTaskCreated(resp);

    setTitle('');
    setDescription('');
  };

  const clearTask = () => {
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
        <Button color="primary" size="small" variant="contained" onClick={createTask} className="button">
          Add new task
        </Button>
        <Button color="secondary" size="small" variant="contained" onClick={clearTask} className="button">
          Clear
        </Button>
      </div>
    </div>
  );
};

export default CreateTaskModal;
