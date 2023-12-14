import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { DeleteSelectedUser, EditSelectedUser, GetAllUsers, showSelectedUser } from '../Redux/ActionCreator'
import { Link, useNavigate } from 'react-router-dom'
import DetailsModal from './DetailsModal'
import { showLoader } from '../Redux/Action'
import LoaderFile from '../Helper/Loader/LoaderFile'
import DeleteModal from './DeleteModal'

const columns = [
    { id: 'id', name: 'Sr.' },
    { id: 'firstName', name: 'First Name' },
    { id: 'lastName', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'action', name: 'Action' },
]


const Users = (props) => {

    const [rowPerPage, setRowPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [delPopup, setDelPopup] = useState(false);
    const [delRowID, setDelRowId] = useState()
    const handleDelClose = () => setDelPopup(false);

    useEffect(() => {
        props.loadUsers()
    }, [props.showLaoding])

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleRowPerPageChange = (event, newPage) => {
        setRowPerPage(+event.target.value)
        setPage(0)
    }

    const handleEdit = (editDetails, state) => {
        dispatch(EditSelectedUser(editDetails))
        navigate(`/user?isEdit=${state}`)
    }

    const handleDelete = (id) => {
        setDelPopup(true)
        setDelRowId(id)
    }

    const handleShow = (showDetails) => {
        setOpen(true);
        dispatch(showSelectedUser(showDetails))
    }

    return (
        <div>
            {props.showLaoding && <LoaderFile />}
            <Paper sx={{ margin: "1%", marginTop: 12 }}>
                <Typography
                    sx={{ fontSize: "22px", textAlign: "center", fontWeight: 700, color: "#191970" }}
                >Users Data Table</Typography>
                <div style={{ margin: "1%", textAlign: 'right' }}>
                    <Button variant='contained' component={Link} to={"/user"}>Add New (+)</Button>
                </div>
                <div style={{ margin: "1%" }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: "midnightblue" }}>
                                    {
                                        columns.length > 0 && columns.map((column) => (
                                            <TableCell key={column.id} style={{ color: "white", textAlign: "center" }}>
                                                {column.name}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    props.userState.usersList &&
                                    props.userState.usersList
                                        .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                        .map((row, i) => {
                                            return (

                                                <TableRow key={i}>
                                                    <TableCell align="center">{i + 1}</TableCell>
                                                    <TableCell align="center">{row.firstName}</TableCell>
                                                    <TableCell align="center">{row.lastName}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">{row.mobile}</TableCell>

                                                    <TableCell align="center">
                                                        <Button
                                                            variant='contained'
                                                            color='primary'
                                                            onClick={e => {
                                                                handleEdit(row.id, true)
                                                            }}
                                                        >Edit</Button>
                                                        <Button
                                                            variant='contained'
                                                            color='error'
                                                            onClick={e => { handleDelete(row.id) }}
                                                        >Delete</Button>
                                                        <Button
                                                            variant='contained'
                                                            color='secondary'
                                                            onClick={e => {
                                                                handleShow(row.id)
                                                            }}
                                                        >Show</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 20]}
                        rowsPerPage={rowPerPage}
                        page={page}
                        count={props.userState.usersList.length}
                        component={'div'}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowPerPageChange}
                    >
                    </TablePagination>
                </div>
            </Paper>
            {
                open && <DetailsModal
                    open={open}
                    handleClose={handleClose}
                />
            }

            {
                delPopup && <DeleteModal 
                     open={delPopup}
                     handleClose={handleDelClose}
                     delRowID={delRowID }
                />
            }
        </div>
    )
}


// converting our state into props here in function  

const mapStatetoProps = (state) => {
    return {
        userState: state.users,
        showLaoding: state.users.showLoading
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        loadUsers: () => dispatch(GetAllUsers())
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(Users)
