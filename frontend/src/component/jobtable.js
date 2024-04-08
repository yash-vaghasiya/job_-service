import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function JobTable({activeJobs}) {
    return (
        <TableContainer component={Paper} sx={{
            border: '2px solid black',
             width: '50%',
             margin:'auto',
            '@media (max-width: 768px)': { 
                width: '100%', 
            },
        }}>
            <Table
                sx={{
                    minWidth: 650,
                }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Job ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Desc</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Created Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activeJobs.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                {index + 1}
                            </TableCell >
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{ new Date(row.created_at).toISOString().split('T')[0]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}