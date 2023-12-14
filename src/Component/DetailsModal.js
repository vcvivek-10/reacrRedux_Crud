import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: 'id', name: 'Sr.' },
    { id: 'firstName', name: 'First Name' },
    { id: 'lastName', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'addressOne', name: 'Address One' },
    { id: 'addressTwo', name: 'Address Two' },
    { id: 'state', name: 'State' },
    { id: 'city', name: 'City' },
    { id: 'country', name: 'Country' },
    { id: 'zipCode', name: 'Zip Code' },
]

const DetailsModal = ({ open, handleClose }) => {

    const showObj = useSelector((state) => state.users.showUserObj)


    return (
        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{ textAlign: "right", marginBottom: "10px" }}>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={handleClose}

                    >X</Button>
                </div>
                <TableContainer>
                    <Typography sx={{textAlign:"center",fontSize:"20px",fontWeight:700,marginBottom:"10px",color:"#191970"}}>User ({showObj.firstName} {showObj.lastName}) Detail</Typography>
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

                            <TableRow>
                                <TableCell>{showObj.id}</TableCell>
                                <TableCell>{showObj.firstName}</TableCell>
                                <TableCell>{showObj.lastName}</TableCell>
                                <TableCell>{showObj.email}</TableCell>
                                <TableCell>{showObj.mobile}</TableCell>
                                <TableCell>{showObj.addressOne}</TableCell>
                                <TableCell>{showObj.addressTwo}</TableCell>
                                <TableCell>{showObj.state}</TableCell>
                                <TableCell>{showObj.city}</TableCell>
                                <TableCell>{showObj.country}</TableCell>
                                <TableCell>{showObj.zipCode}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}

export default DetailsModal
