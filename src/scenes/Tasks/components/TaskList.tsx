import { Button, Table, TableBody, Paper, TableRow, TableHead, TableContainer, TableCell } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import history from 'history/browser';

import { TaskAPI } from '../../../api/task.api';
import { TaskDTO } from '../../../api/dto/task.dto';

import TaskItem from './TaskItem';

import '../styles.css';

const page = 0;
const rowsPerPage = 10;

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const resp = await TaskAPI.getAll();
        setTasks(resp);
      } catch (e) {
        console.error('error: ', e);
      }
    }

    if (!tasks.length) {
      fetchAll();
    }
  }, []);

  const handleAddTask = (task: TaskDTO) => {
    setTasks([task, ...tasks]);
    console.log('Add a new item: ', task);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((x) => x.id !== taskId));
    console.log('delete an item: ', taskId);
  };

  const handleUpdateTask = (task: TaskDTO) => {
    setTasks(
      tasks.map((x) => {
        if (x.id === task.id) return task;
        return x;
      }),
    );
    console.log('update an item: ', task);
  };

  const handleDeleteAllTasks = () => {
    console.log('delete all items');
  };

  const handleNewTask = useCallback(() => history.push('tasks/new'), [history]);

  return (
    <>
      <div className="edit-block">
        <div className="buttons">
          <Button color="primary" size="small" variant="contained" onClick={handleNewTask} className="button">
            Add new task
          </Button>
          <Button color="secondary" size="small" variant="contained" onClick={handleDeleteAllTasks} className="button">
            Delete All
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="Tasks">
          <TableHead>
            <TableRow>
              <TableCell width="200px">Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell width="30px">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TaskItem key={row.id} data={row} onTaskDelete={handleDeleteTask} onTaskUpdate={handleUpdateTask} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
