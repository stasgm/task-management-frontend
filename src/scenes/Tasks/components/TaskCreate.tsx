import { useState } from 'react';
import TextField from '@mui/material/TextField';
import history from 'history/browser';
import Button from '@mui/material/Button';

import { TaskAPI } from '../../../api/task.api';
// import { TaskDTO } from '../../../api/dto/task.dto';

import '../styles.css';

// interface Props {
//   onTaskCreated: (task: TaskDTO) => void;
// }

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTask = async () => {
    const resp = await TaskAPI.createOne({
      title,
      description,
    });

    // props.onTaskCreated(resp);

    setTitle('');
    setDescription('');

    history.push('/tasks');
  };

  const handleClearTask = () => {
    setTitle('');
    setDescription('');
  };

  const handleClose = () => {
    history.push('/tasks');
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
