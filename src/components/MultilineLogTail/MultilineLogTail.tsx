/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/MultilineLogTail/MultilineLogTail.tsx

Created with;
$ npx generate-react-cli component MultilineLogTail --type=materialui

*/

import React, { useCallback, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DOMPurify from 'dompurify'
import { Types } from '../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '463px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
)

export default function MultilineLogTail(props: IMultilineLogTailProps) {
  const [data, setData] = React.useState('')

  const classes = useStyles()

  const memoizedUpdateCallback = useCallback(() => {
    let tailValue = ''

    if (props.radioButtonsState.templates || props.radioButtonsState.both) {
      props.templateData.forEach((value) => {
        const currentLine = `${value.Template}, ${value.Template_id}, ${value.Version}`
        if (props.tailSearch !== '' && currentLine.includes(props.tailSearch)) {
          tailValue += `${currentLine}<br /><br />`
        } else if (props.tailSearch === '') {
          tailValue += `${currentLine}<br /><br />`
        }
      })
    }

    if (props.radioButtonsState.variables || props.radioButtonsState.both) {
      props.variableData.forEach((value) => {
        const currentLine = `${value.record_id}, ${value.template_id}, ${value.template_version}, ${value.time_window_id}, ${value.host}, ${value.timestamp}, ${value.otherheaders}, ${value.timestamp_1}, ${value.SearchFields}, ${value.num_1}, ${value.num_2}, ${value.num_3}, ${value.pack_auto_log_1}, ${value.wpa_supplicant_1}`
        if (props.tailSearch !== '' && currentLine.includes(props.tailSearch)) {
          tailValue += `${currentLine}<br /><br />`
        } else if (props.tailSearch === '') {
          tailValue += `${currentLine}<br /><br />`
        }
      })
    }

    tailValue = tailValue.replaceAll('<', '&#60')
    tailValue = tailValue.replaceAll('>', '&#62')

    const newVal = props.tailSearch === ''
      ?
      tailValue
      :
      tailValue.replaceAll(props.tailSearch, `<span style="background-color: #FFFF00; color: #000000; display: inline">${props.tailSearch}</span>`)
      // tailValue.split(props.tailSearch).join(`<span style="background-color: #FFFF00; color: #000000">${props.tailSearch}</span>`)
    setData(newVal)
  }, [props.radioButtonsState.both, props.radioButtonsState.templates, props.radioButtonsState.variables, props.tailSearch, props.templateData, props.variableData])

  useEffect(() => {
    memoizedUpdateCallback()
  }, [memoizedUpdateCallback, props.radioButtonsState])

  useEffect(() => {
    if (props.tailSearch !== '') {
      memoizedUpdateCallback()
    }
  }, [memoizedUpdateCallback, props.tailSearch])

  function createMarkup(str: string) {
    return {
      __html: DOMPurify.sanitize(str),
    }
  }

  return (
    <div className={classes.root}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={createMarkup(data)} style={{ textAlign: 'left' }} />
    </div>
  )
}

interface IMultilineLogTailProps {
  // eslint-disable-next-line react/no-unused-prop-types
  templateData: Types.TemplateData[]
  // eslint-disable-next-line react/no-unused-prop-types
  variableData: Types.VariablesData[]
  radioButtonsState: Types.LogRadioState
  tailSearch: string
}
