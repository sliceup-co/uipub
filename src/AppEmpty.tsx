/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/App.tsx
*/

import React from 'react'
import './App.scss'
import { createStyles, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '100px 20px 20px 20px',
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
    },
  })
)

function AppEmpty() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ minHeight: 200, overflow: 'auto' }}>
            <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ minHeight: 450, overflow: 'auto' }}>
            <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ minHeight: 260 }}>
            <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ minHeight: 500, overflow: 'auto' }}>
            <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ minHeight: 430, maxHeight: 600, overflow: 'auto' }}>
            <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ minHeight: 370, maxHeight: 600, overflow: 'auto' }}>
            <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default AppEmpty
