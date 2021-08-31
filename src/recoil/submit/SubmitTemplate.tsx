/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/SubmitTemplate.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import { Types } from '../../types'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'

// @ts-ignore
export function SubmitTemplate(props: ISubmitTemplateProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_templates_paginated')
  const urlWithString = `${URL}?pageNumber=${props.pageNumber}&resultsPerPage=${props.resultsPerPage}&filterType=${props.filterTemplateType}`
  if (props.loadingTemplateDataRequestInProgress !== urlWithString) {
    props.setLoadingTemplateDataRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; totalResults: number; data: Types.TemplateData[] }
    }).then(function complete(results) {
      props.onTemplateRequestCompleteHandler(results.data, props.pageNumber, props.resultsPerPage, results.totalResults)
    })
  }
  return <></>
}

interface ISubmitTemplateProps {
  setLoadingTemplateDataRequestInProgress: Dispatch<SetStateAction<string>>
  loadingTemplateDataRequestInProgress: string
  resultsPerPage: number
  pageNumber: number
  onTemplateRequestCompleteHandler: (data: Types.TemplateData[], pageNumber: number, resultsPerPage: number, totalResults: number) => void
  filterTemplateType: string
}
