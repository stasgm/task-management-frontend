// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import theme from '../styles/theme';

import { TaskDTO } from '../api/dto/task.dto';

interface Props {
  rows: TaskDTO[];
}

export default function TaskList({ rows }: Props) {
  const page = 0;
  const rowsPerPage = 10;

  return (
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
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:nth-of-type(odd)': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
