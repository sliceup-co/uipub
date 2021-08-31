import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core'

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

export default function HistogramBinModal(props: IHistogramBinModalProps) {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpenModal(false);
  };

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
            <h4 id="transition-modal-title">Filter by Day</h4>
            {props.selectedBin.map((item) => (
              <>
                <Button
                  onClick={() => { props.setSelectedDate(item) }}
                >
                  {item.date}
                </Button>
              </>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

interface IHistogramBinModalProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  selectedBin: {date: string, value: number}[]
  setSelectedDate: (item: {date: string, value: number}) => void
}