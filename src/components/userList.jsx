import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Paper } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { getUsers } from '../services/userService';
import { styled } from '@mui/system';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
}));

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Container maxWidth="xl" style={{ margin: '20px auto', direction: 'rtl', textAlign: 'right'}}>
            <TableContainer component={Paper}>
                <Table style={{ backgroundColor: '#f9f9f9',fontSize:'25px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">שם</TableCell>
                            <TableCell align="right">אימייל</TableCell>
                            <TableCell align="right">תאריך</TableCell>
                            <TableCell align="right">פעולה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={user.Email}>
                                <TableCell align="right">{user.Name}</TableCell>
                                <TableCell align="right">{user.Email}</TableCell>
                                <TableCell align="right">{user.Date}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="שליחת מייל" arrow>
                                        <IconButton
                                            style={{ color: '#3e2723' }}
                                            onClick={() => window.open(`mailto:${user.Email}`, '_self')}
                                        >
                                            <EmailIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserList;
