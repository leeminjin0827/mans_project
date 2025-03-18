import { Fragment, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { Divider, ModalClose, Sheet, Typography } from "@mui/joy";



export default function StaticModal(props) {
    useEffect(() => {setOpen(props.isOpen);}, [props.isOpen]);
    const [open, setOpen] = useState(props.isOpen);
    const onClose = () => {
        setOpen(false);
        if(props.onClose) {
            props.onClose(false);
        }
    }

    return (
        <>
            <Fragment>
                <Modal
                    aria-labelledby="close-modal-title"
                    open={open}
                    onClose={(_event, reason) => {
                    setOpen(true);
                    }}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Sheet variant="outlined" onClick={(event) => {event.stopPropagation();}} sx={{ minWidth: 300, maxHeight : "80vh", borderRadius: 'md', pr : 3, pb : 3, pl : 3}} >
                        <ModalClose variant="outlined" onClick={onClose} />
                        <Typography component="h3" id="close-modal-title" level="h3" textColor="inherit" sx={{ fontWeight: 'lg', mt : "15px", mb : "15px" }}>
                            {props.title}
                        </Typography>
                        {
                            props.openData
                        }
                    </Sheet>
                </Modal>
            </Fragment>
        </>
    );
  }