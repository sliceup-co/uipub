/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/TimeSelectorPicker/TimeSelectorPicker.tsx

Created with;
$ npx generate-react-cli component TimeSelectorPicker --type=materialui

https://material-ui.com/components/pickers/

Add;
yarn add @date-io/date-fns@^1.3.13 - must be 1.3.13 or it will fail!
yarn add @material-ui/pickers
yarn add date-fns @types/date-fns

*/

import React, { Dispatch, SetStateAction, useEffect } from 'react'
import 'date-fns'

import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default function TimeSelectorPicker(props: ITimeSelectorPickerProps) {

  const [selectedStartDate, setSelectedStartDate] = React.useState<Date>(new Date('05/12/21')) // yesterday - const dayBefore = 1; new Date(Date.now() - dayBefore*24*60*60*1000)
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date>(new Date())

  const [realTimeState, setRealTimeState] = React.useState({
    realTime: false,
  })

  const handleStartDateChange = (date: Date | null) => {
    const dateAsString = (date as Date).toISOString().slice(0, 10)
    props.setSelectedStartDate(dateAsString)
    props.updateStartEndTimeHandler(dateAsString, props.selectedEndDate, false)
  }

  const handleEndDateChange = (date: Date | null) => {
    const dateAsString = (date as Date).toISOString().slice(0, 10)
    props.setSelectedEndDate(dateAsString)
    props.updateStartEndTimeHandler(props.selectedStartDate, dateAsString, false)
  }

  const handleRealTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isRealTime = event.target.checked
    setRealTimeState({ ...realTimeState, [event.target.name]: isRealTime })
    if (isRealTime)
      props.updateStartEndTimeHandler('', '', isRealTime)
  }

  useEffect(() => {
    if (props.selectedStartDate && props.selectedStartDate !== '')
      setSelectedStartDate(new Date(props.selectedStartDate))
    if (props.selectedEndDate && props.selectedEndDate !== '')
      setSelectedEndDate(new Date(props.selectedEndDate))
  }, [props.selectedStartDate, props.selectedEndDate])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        {
          realTimeState.realTime ?
            <>
              <KeyboardDatePicker
                disabled
                disableToolbar
                variant="inline"
                format="MM/dd/yy"
                margin="normal"
                id="date-picker-inline"
                label="Time Selector"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disabled
                margin="normal"
                id="date-picker-dialog"
                label="To"
                format="MM/dd/yy"
                value={selectedEndDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </>
            :
            <>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yy"
                margin="normal"
                id="date-picker-inline"
                label="Time Selector"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="To"
                format="MM/dd/yy"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </>
        }
        <FormControlLabel
          value="realtime"
          control={<Checkbox checked={realTimeState.realTime} onChange={handleRealTimeChange} name="realTime" />}
          label="Realtime Updating"
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

interface ITimeSelectorPickerProps {
  updateStartEndTimeHandler: (startDate: string, endDate: string, isRealTime: boolean) => void
  selectedStartDate: string
  setSelectedStartDate: Dispatch<SetStateAction<string>>
  selectedEndDate: string
  setSelectedEndDate: Dispatch<SetStateAction<string>>
}
