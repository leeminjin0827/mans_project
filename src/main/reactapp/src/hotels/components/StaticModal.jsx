import { Fragment, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { ModalClose, Sheet, Typography } from "@mui/joy";



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
                {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                Open modal
                </Button> */}
                <Modal
                    aria-labelledby="close-modal-title"
                    open={open}
                    onClose={(_event, reason) => {
                    alert(`Reason: ${reason}`);
                    setOpen(true);
                    }}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Sheet variant="outlined" sx={{ minWidth: 300, borderRadius: 'md', p: 3 }}>
                        <ModalClose variant="outlined" onClick={onClose} />
                        <Typography component="h2" id="close-modal-title" level="h4" textColor="inherit" sx={{ fontWeight: 'lg' }}>
                            Modal title
                        </Typography>
                    </Sheet>
                </Modal>
            </Fragment>
        </>
    );
  }