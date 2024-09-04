import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Paper, TableSortLabel, TextField, InputAdornment, TablePagination, CircularProgress, Typography, Button } from '@mui/material';
import { Email as EmailIcon, Search as SearchIcon, Download as DownloadIcon } from '@mui/icons-material';
import { getUsers } from '../services/userService'; // שים לב להכניס את נתיב ה-API הנכון
import { styled } from '@mui/system';
import { format, parseISO } from 'date-fns';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// עיצוב שורות הטבלה
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#e0d5c9',
    },
}));

// עיצוב הכפתור
const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#6d4c41',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#5d4037',
    },
    marginBottom: '20px',
}));

// Override for the RTL direction
const PaginatorContainer = styled('div')({
    direction: 'ltr', // Reset the direction for the paginator
});

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Name');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const getComparator = (order, orderBy) => {
        return (a, b) => {
            if (orderBy === 'Date') {
                const dateA = parseISO(a[orderBy]);
                const dateB = parseISO(b[orderBy]);
                return (order === 'asc' ? dateA - dateB : dateB - dateA);
            } else {
                if (a[orderBy] < b[orderBy]) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[orderBy] > b[orderBy]) {
                    return order === 'asc' ? 1 : -1;
                }
                return 0;
            }
        };
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredUsers = users.filter(user =>
        user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort(getComparator(order, orderBy));

    const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(paginatedUsers.map(user => ({
            שם: user.Name,
            אימייל: user.Email,
            תאריך: format(parseISO(user.Date), 'dd/MM/yyyy'),
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'users.xlsx');
    };

    if (loading) {
        return (
            <Container maxWidth="xl" style={{ margin: '20px auto', direction: 'rtl', textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: '20px' }}>טוען נתונים...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" style={{ margin: '20px auto', direction: 'rtl', textAlign: 'center' }}>
                <Typography variant="h6" color="error">התרחשה שגיאה בעת טעינת הנתונים.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" style={{ margin: '20px auto', direction: 'rtl', textAlign: 'right' }}>
            <StyledButton
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={exportToExcel}
            >
                הורד קובץ אקסל
            </StyledButton>
            <TextField
                variant="outlined"
                placeholder="חפש משתמשים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '20px', width: '100%' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper}>
                <Table style={{ backgroundColor: '#f5e9e2', fontSize: '18px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'Name'}
                                    direction={orderBy === 'Name' ? order : 'asc'}
                                    onClick={() => handleRequestSort('Name')}
                                >
                                    שם
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'Email'}
                                    direction={orderBy === 'Email' ? order : 'asc'}
                                    onClick={() => handleRequestSort('Email')}
                                >
                                    אימייל
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'Date'}
                                    direction={orderBy === 'Date' ? order : 'asc'}
                                    onClick={() => handleRequestSort('Date')}
                                >
                                    תאריך
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">פעולה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <StyledTableRow key={user.Email}>
                                <TableCell align="right">{user.Name}</TableCell>
                                <TableCell align="right">{user.Email}</TableCell>
                                <TableCell align="right">{format(parseISO(user.Date), 'dd/MM/yyyy')}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="שליחת מייל" arrow>
                                        <IconButton
                                            style={{ color: '#6d4c41' }}
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
            <PaginatorContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ marginTop: '20px' }}
                />
            </PaginatorContainer>
        </Container>
    );
};

export default UserList;
