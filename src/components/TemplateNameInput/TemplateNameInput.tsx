/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/TemplateNameInput/TemplateNameInput.tsx

Created with;
$ npx generate-react-cli component TemplateNameInput --type=materialui

*/

import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CategoriesDropDown from '../CategoriesDropDown/CategoriesDropDown'
import { Types } from '../../types'

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
      height: 50,
      margin: 4,
    },
  })
)

export default function TemplateNameInput(props: ICustomizedTemplateNameInputProps) {
  const classes = useStyles()

  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [addCategory, setAddCategory] = React.useState(false)

  const onCategoryChangeHandler = (newCategory: string) => {
    setCategory(newCategory)
  }

  const onSubmitHandler = () => {
    props.onTemplateUpdatedHandler(value, category)
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        value={props.templateId}
        className={classes.input}
        placeholder="Template Id"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <InputBase
        value={value}
        className={classes.input}
        placeholder="Update Template Name"
        inputProps={{ 'aria-label': 'Update Template Name' }}
        onChange={(event) => {
          const val = event.target.value as unknown as string
          setValue(val)
        }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <div style={{ width: 10 }} />
      { !addCategory ?
        <Button onClick={() => setAddCategory(true)}>Add New Category</Button>
        :
        <Button onClick={() => setAddCategory(false)}>Select From Existing Category</Button>}
      <div style={{ width: 10 }} />
      { addCategory ?
        <TextField id="filled-secondary" label="Category" variant="filled" color="secondary" onChange={(event) => {setCategory(event.target.value as string) }} />
        :
        <CategoriesDropDown categoriesData={props.categoriesData} onCategoryChangeHandler={onCategoryChangeHandler} />}
      <div style={{ width: 10 }} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          onSubmitHandler()
        }}
      >
        Update
      </Button>
    </Paper>
  )
}

interface ICustomizedTemplateNameInputProps {
  categoriesData: Types.CategoriesData[]
  onTemplateUpdatedHandler: (name: string, category: string) => void
  templateId: string
}
