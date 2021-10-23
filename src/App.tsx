import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './App.css';
import { TaskAPI } from './api/task.api';
import { TaskDTO } from './api/dto/task.dto';

// import Task from './components/Task';
import CreateTaskModal from './components/CreateTask';
// import EditTaskModal from './components/EditTaskModal';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [updateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState<undefined | TaskDTO>(undefined);

  const addTask = (task: TaskDTO) => {
    setTasks([task, ...tasks]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((x) => x.id !== taskId));
  };

  const updateTask = (task: TaskDTO) => {
    setTasks(
      tasks.map((x) => {
        if (x.id === task.id) return task;
        return x;
      }),
    );
  };

  useEffect(() => {
    async function fetchAll() {
      try {
        const resp = await TaskAPI.getAll();
        setTasks(resp);
      } catch (e) {
        console.error('error: ', e);
      }
    }

    fetchAll();
  }, []);

  const onTaskEditBtnClicked = (task: TaskDTO) => {
    return;
  };

  return (
    <div className="App">
      <AppBar position="static" className="App-header">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          {/* <Button variant="contained" color="primary" onClick={() => setCreateTaskModalOpen(true)}>
            Create Task
          </Button> */}
        </Toolbar>
      </AppBar>

      <CreateTaskModal onTaskCreated={addTask} />
      <TaskList rows={tasks} />

      {/* <Grid container spacing={1} style={{ padding: 10 }}>
        {tasks.map((task) => {
          return (
            <Grid item xs={3}>
              <Task
                data={task}
                onTaskDelete={deleteTask}
                onTaskUpdate={(task: TaskDTO) => {
                  setTaskBeingEdited(task);
                  setUpdateTaskModalOpen(true);
                }}
              />
            </Grid>
          );
        })}
      </Grid> */}
    </div>
  );
}

export default App;
