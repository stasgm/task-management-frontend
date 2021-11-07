import React, { useState, useEffect } from 'react';
// import { Modal, makeStyles, TextField, Button, MenuItem, Select } from '@material-ui/core';

// import { TaskAPI } from '../../../api/task.api';
import { TaskDto, TaskStatus } from '../../../services/tasks/dto/task.dto';

const TaskEdit = () => {
  // const useStyles = makeStyles((theme) => ({
  //   paper: {
  //     position: 'absolute',
  //     width: 400,
  //     backgroundColor: theme.palette.background.paper,
  //     border: '2px solid #000',
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(2, 4, 3),
  //   },
  //   textField: {
  //     width: '100%',
  //   },
  //   createBtn: {
  //     width: '100%',
  //     marginTop: 10,
  //   },
  // }));
  // const [modalStyle] = React.useState(getModalStyle);
  // const [open, setOpen] = React.useState(false);
  // const classes = useStyles();

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState<undefined | string>(undefined);
  // const [status, setStatus] = useState(TaskStatus.Created);

  // useEffect(() => {
  //   if (props.data) {
  //     setTitle(props.data.title);
  //     setDescription(props.data.description);
  //     setStatus(props.data.status);
  //   }
  // }, [props.data]);

  // const updateTask = async () => {
  //   if (props.data) {
  //     const resp = await TaskAPI.updateOne(props.data.id, {
  //       title,
  //       description,
  //       status,
  //     });

  //     props.onTaskUpdate(resp);

  //     console.log('New Task', resp);
  //   }
  // };

  return (
    <div>
      <h2 id="simple-modal-title">Update Task</h2>
      {/* <TextField
         placeholder="Title"
         variant="filled"
         className={classes.textField}
         onChange={(e) => setTitle(e.target.value)}
         value={title}
       />
       <TextField
         placeholder="Description"
         variant="filled"
         className={classes.textField}
         onChange={(e) => setDescription(e.target.value)}
         value={description}
       />
      <Select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className={classes.textField}>
        <MenuItem value={TaskStatus.Created}>Created</MenuItem>
        <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
        <MenuItem value={TaskStatus.Done}>Done</MenuItem>
      </Select>
      <Button color="primary" variant="contained" className={classes.createBtn} onClick={updateTask}>
        Update Task
      </Button> */}
    </div>
  );
};

export default TaskEdit;
