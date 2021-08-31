import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import CategoriesDropDown from '../CategoriesDropDown/CategoriesDropDown'
import { Types } from '../../types'

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

export default function TemplateListModal(props: ITemplateListModalProps) {
  const classes = useStyles();

  const [name, setName] = React.useState('')
  const [fields, setFields] = React.useState('')
  const [categories, setCategories] = React.useState('')

  const [addCategory, setAddCategory] = React.useState(false)

  const handleClose = () => {
    props.setOpenModal(false);
  }

  const onCategoryChangeHandler = (selectedCategories: string) => {
    setCategories(selectedCategories)
  }

  const onUpdateClickHandler = () => {
    props.onSubmitHandler(name, fields, categories)
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
              Id: {props.templateId}
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
                { !addCategory ?
                  <Button onClick={() => setAddCategory(true)}>Add New Category</Button>
                  :
                  <Button onClick={() => setAddCategory(false)}>Select From Existing Category</Button>}
                <Grid item>
                  { addCategory ?
                    <TextField id="filled-secondary" label="Category" variant="filled" color="secondary" onChange={(event) => {setCategories(event.target.value as string) }} />
                    :
                    <CategoriesDropDown categoriesData={props.categoriesData} onCategoryChangeHandler={onCategoryChangeHandler} />}
                </Grid>
                <Grid item>
                  <TextField
                    id="filled-secondary"
                    label="Field Names"
                    variant="filled"
                    color="secondary"
                    onChange={(event) => {
                      setFields(event.target.value as string)
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

interface ITemplateListModalProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  templateId: string
  categoriesData: Types.CategoriesData[]
  onSubmitHandler: (name: string, fields: string, categories: string) => void
}