import { Fragment, useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { ModalClose, Sheet } from "@mui/joy";



export default function StaticModal(props) {
    const [open, setOpen] = useState(true);
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
                    setOpen(false);
                    }}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Sheet variant="outlined" sx={{ minWidth: 300, borderRadius: 'md', p: 3 }}>
                        <ModalClose variant="outlined" />
                        <Typography component="h2" id="close-modal-title" level="h4" textColor="inherit" sx={{ fontWeight: 'lg' }}>
                            Modal title
                        </Typography>
                    </Sheet>
                </Modal>
            </Fragment>
        </>
    );
  }