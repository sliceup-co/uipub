/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/Header/HeaderTopNav.tsx
*/

import React from 'react'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const theme = createMuiTheme({})

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
    background: 'transparent',
    border: 0,
    color: 'rgb(245, 245, 245)',
    height: 50,
    weight: 30,
    padding: '0 50px 0 0px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
    '& .MuiTouchRipple-root span': {
      backgroundColor: 'transparent!important',
      opacity: 0.3,
    },
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    '&:hover': {
      color: 'rgb(67, 72, 69)',
    },
  },
})

export default function ClassesNesting() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      {[
        { name: 'about', url: '/about' },
        { name: 'contact', url: '/Contact' },
        { name: 'privacy', url: '/privacy' },
      ].map((itemObject) => (
        <Button
          component={Link}
          to={itemObject.url}
          key={itemObject.url}
          classes={{
            root: classes.root,
            label: classes.label,
          }}
        >
          {itemObject.name}
        </Button>
      ))}
    </ThemeProvider>
  )
}
