import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function ParsedAppNameDataModal(props: IParsedAppNameDataModalProps) {
  const classes = useStyles();

  const [name, setName] = React.useState('')

  const handleClose = () => {
    props.setOpenModal(false);
  }

  const onUpdateClickHandler = () => {
    props.onSubmitAppNameChangeHandler(props.oldName, name)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            <h4 id="transition-modal-title">
              Id: {props.recordId}
            </h4>
            <div className="modal-form-content">
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <TextField
                    id="filled-secondary"
                    label="Name"
                    variant="filled"
                    color="secondary"
                    onChange={(event) => {
                      setName(event.target.value as string)
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={onUpdateClickHandler}>
                    Update
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

interface IParsedAppNameDataModalProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  recordId: string
  oldName: string
  onSubmitAppNameChangeHandler: (oldName: string, newName: string) => void
}