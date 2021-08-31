/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/SubmitUpdateFields.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'

export function SubmitUpdateFields(props: ISubmitUpdateFieldsProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'update_field')
  const urlWithString = `${URL}?oldName=${props.updateFieldsNameData.oldName}&newName=${props.updateFieldsNameData.newName}`
  if (props.loadingUpdateFieldsDataRequestInProgress !== urlWithString) {
    props.setLoadingUpdateFieldsDataRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string }
    }).then(function complete(results) {
      props.onUpdateFieldsRequestCompleteHandler(results.status)
    })
  }
  return <></>
}

interface ISubmitUpdateFieldsProps {
  setLoadingUpdateFieldsDataRequestInProgress: Dispatch<SetStateAction<string>>
  loadingUpdateFieldsDataRequestInProgress: string
  onUpdateFieldsRequestCompleteHandler: (status: string) => void
  updateFieldsNameData: { oldName: string, newName: string }
}
