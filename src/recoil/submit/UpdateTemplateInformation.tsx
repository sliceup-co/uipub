/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/UpdateTemplateInformation.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'
import { Types } from '../../types'

export function UpdateTemplateInformation(props: IUpdateTemplateInformationProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'update_templates')
  const urlWithString = `${URL}?name=${props.templateData.name}&category=${props.templateData.category}&fields=${props.templateData.fields}`
  if (props.loadingUpdateTemplateInProgress !== urlWithString) {
    props.setLoadingUpdateTemplateInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; data: Types.CategoriesData[] }
    }).then(function complete(results) {
      props.onUpdateTemplateRequestCompleteHandler(results.status)
    })
  }
  return <></>
}

interface IUpdateTemplateInformationProps {
  setLoadingUpdateTemplateInProgress: Dispatch<SetStateAction<string>>
  loadingUpdateTemplateInProgress: string
  onUpdateTemplateRequestCompleteHandler: (status: string) => void
  templateData: Types.UpdateTemplateData
}
