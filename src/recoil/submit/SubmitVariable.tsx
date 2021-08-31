/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/SubmitVariables.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import { Types } from '../../types'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'
import { variablesFilterObject } from '../../model'

export function SubmitVariable(props: ISubmitVariableProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_variable_data_paginated')
  const urlWithString = `${URL}?pageNumber=${props.variablesFilter.pageNumber}&resultsPerPage=${props.variablesFilter.resultsPerPage}&templateName=${props.variablesFilter.templateName}&category=${props.variablesFilter.category}&startDate=${props.startDate}&endDate=${props.endDate}`
  if (props.loadingVariablesRequestInProgress !== urlWithString) {
    props.setLoadingVariablesRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; totalResults: number; pageNumber: number; resultsPerPage: number; data: Types.VariablesData[] }
    }).then(function complete(results) {
      props.onVariablesRequestCompleteHandler(results.data, results.pageNumber, results.resultsPerPage, results.totalResults)
    })
  }
  return <></>
}

interface ISubmitVariableProps {
  variablesFilter: variablesFilterObject
  startDate: string
  endDate: string
  setLoadingVariablesRequestInProgress: Dispatch<SetStateAction<string>>
  loadingVariablesRequestInProgress: string
  onVariablesRequestCompleteHandler: (data: Types.VariablesData[], pageNumber: number, resultsPerPage: number, totalResults: number) => void
}
