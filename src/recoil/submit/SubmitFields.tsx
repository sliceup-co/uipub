/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/SubmitFields.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'
import { Types } from '../../types'

export function SubmitFields(props: ISubmitFieldsProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_fields')
  const urlWithString = `${URL}`
  if (props.loadingFieldsDataRequestInProgress !== urlWithString) {
    props.setLoadingFieldsDataRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; data: Types.FieldsData[] }
    }).then(function complete(results) {
      props.onFieldsRequestCompleteHandler(results.data)
    })
  }
  return <></>
}

interface ISubmitFieldsProps {
  setLoadingFieldsDataRequestInProgress: Dispatch<SetStateAction<string>>
  loadingFieldsDataRequestInProgress: string
  onFieldsRequestCompleteHandler: (data: Types.FieldsData[]) => void
}
