/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/SearchInput/SearchInput.tsx

Created with;
$ npx generate-react-cli component SearchInput --type=materialui

*/

import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MicIcon from '@material-ui/icons/Mic'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
)

export default function CustomizedSearchInput(props: ICustomizedSearchInputProps) {
  const classes = useStyles()

  const onSubmitHandler = () => {
    props.updateTailSearchResultsHandler(props.tailSearch)
  }

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        value={props.tailSearch}
        className={classes.input}
        placeholder="Search to filter matching terms"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(event) => {
          const val = event.target.value as unknown as string
          props.setTailSearch(val)
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={() => {
          onSubmitHandler()
        }}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <MicIcon />
      </IconButton>
    </Paper>
  )
}

interface ICustomizedSearchInputProps {
  updateTailSearchResultsHandler: (value: string) => void
  tailSearch: string
  setTailSearch: Dispatch<SetStateAction<string>>
}
