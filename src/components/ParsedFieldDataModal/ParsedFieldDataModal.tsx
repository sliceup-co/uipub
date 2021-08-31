import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import { Types } from '../../types'
import FieldsDropDown from '../FieldsDropDown/FieldsDropDown'

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

export default function ParsedFieldDataModal(props: IParsedFieldDataModalProps) {
  const classes = useStyles();

  const [fieldName, setFieldName] = React.useState('')

  const [addField, setAddField] = React.useState(false)

  const handleFieldModalClose = () => {
    props.setOpenFieldModal(false);
  }

  const onFieldChangeHandler = (selectedFieldName: string) => {
    setFieldName(selectedFieldName)
  }

  const onUpdateClickHandler = () => {
    props.onSubmitHandler(props.selectedFieldName, fieldName)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={handleFieldModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            <h4 id="transition-modal-title">
              Field Name: {props.selectedFieldName}
            </h4>
            <div className="modal-form-content">
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <p />
                </Grid>
                { !addField ?
                  <Button onClick={() => setAddField(true)}>Add New Field</Button>
                  :
                  <Button onClick={() => setAddField(false)}>Select From Existing Field</Button>}
                <Grid item>
                  { addField ?
                    <TextField id="filled-secondary" label="Field" variant="filled" color="secondary" onChange={(event) => {setFieldName(event.target.value as string) }} />
                    :
                    <FieldsDropDown fieldsData={props.fieldsNameData} onFieldChangeHandler={onFieldChangeHandler} />}
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

interface IParsedFieldDataModalProps {
  openModal: boolean
  setOpenFieldModal: Dispatch<SetStateAction<boolean>>
  fieldsNameData: Types.FieldsData[]
  selectedFieldName: string
  onSubmitHandler: (oldName: string, newName: string) => void
}