import { Table, TableBody, Paper, TableRow, TableHead, TableContainer, TableCell, Button } from '@mui/material';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TasksService from '../../../services/tasks/tasks.service';
import { TaskDto } from '../../../services/tasks/dto/task.dto';

import TaskItem from './TaskItem';

import '../styles.css';
import ConfirmDialog from './ConfirmDialog';

const page = 0;
const rowsPerPage = 10;

const TaskList = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    async function fetchAll() {
      try {
        const resp = await TasksService.fetchTasks();
        if (resp) {
          setTasks(resp);
        }
      } catch (e) {
        console.error('error: ', e);
      }
    }

    if (!tasks.length) {
      fetchAll();
    }
  }, []);

  const handleDeleteTask = async () => {
    console.log('delete an item: ', taskId);
    try {
      await TasksService.deleteById(taskId);
      setTasks((prev) => prev.filter((i) => i.id !== taskId));
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const handleDeleteAllTasks = () => console.log('delete all items');
  const handleNewTask = useCallback(() => navigate('new'), [navigate]);
  const handleEditTask = useCallback((id) => navigate(id), [navigate]);
  const showDeleteDialog = (taskId: string) => {
    setTaskId(taskId);
    setConfirmOpen(true);
  };

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
              <TableCell width="150px">Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell width="30px">Status</TableCell>
              <TableCell width="100px" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TaskItem
                key={row.id}
                data={row}
                onTaskDelete={showDeleteDialog}
                onTaskUpdate={() => handleEditTask(row.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog title="Delete task?" open={confirmOpen} setOpen={setConfirmOpen} onConfirm={handleDeleteTask}>
        Are you sure you want to delete this task?
      </ConfirmDialog>
    </>
  );
};

export default TaskList;
