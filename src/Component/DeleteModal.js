import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DeleteSelectedUser } from '../Redux/ActionCreator';
import { showLoader } from '../Redux/Action';
import { useDispatch } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: "center"
};

export default function DeleteModal({ open, handleClose, delRowID }) {

    const dispatch = useDispatch()

    const handleConfirmClick = () => {
        dispatch(DeleteSelectedUser(delRowID))
        dispatch(showLoader(true))
        handleClose()
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    Do You Want To Delete ?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Button
                        variant='contained'
                        color='error'
                        sx={{ marginLeft: "10px !important", marginRight: "10px !important" }}
                        onClick={handleConfirmClick}

                    >Yes</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ marginLeft: "10px !important", marginRight: "10px !important" }}
                        onClick={handleClose}

                    >No</Button>
                </Typography>
            </Box>
        </Modal>
    )
}
