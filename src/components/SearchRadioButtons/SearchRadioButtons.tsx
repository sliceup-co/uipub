/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/SearchRadioButtons/SearchRadioButtons.tsx

Created with;
$ npx generate-react-cli component SearchRadioButtons --type=materialui

https://material-ui.com/components/radio-buttons/

*/

import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import './SearchRadioButtons.scss'

export default function SearchRadioButtons(props: ISearchRadioButtonsProps) {
  const handleChange = (value: string, checked: boolean) => {
    props.updateTailStateHandler(value, checked)
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          name="both"
          value="top"
          onChange={(event: React.ChangeEvent<{}>, checked: boolean) => handleChange('both', checked)}
          control={<Radio color="primary" />}
          label="Templates & Variables"
          labelPlacement="start"
        />
        <FormControlLabel
          name="templates"
          value="start"
          onChange={(event: React.ChangeEvent<{}>, checked: boolean) => handleChange('templates', checked)}
          control={<Radio color="primary" />}
          label="Templates Only"
          labelPlacement="start"
        />
        <FormControlLabel
          name="variables"
          value="bottom"
          onChange={(event: React.ChangeEvent<{}>, checked: boolean) => handleChange('variables', checked)}
          control={<Radio color="primary" />}
          label="Variables Only"
          labelPlacement="start"
        />
      </RadioGroup>
    </FormControl>
  )
}

interface ISearchRadioButtonsProps {
  updateTailStateHandler: (value: string, checked: boolean) => void
}
