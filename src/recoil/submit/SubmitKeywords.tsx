/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/SubmitKeywords.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import { Types as WordCloudType } from '../../widgets/WordCloudWidget/types'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'
import { variablesFilterObject } from '../../model'

export function SubmitKeywords(props: ISubmitKeywordsProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_keywords_from_templates')
  const urlWithString = `${URL}?pageNumber=${props.variablesFilter.pageNumber}&resultsPerPage=${props.variablesFilter.resultsPerPage}&startDate=${props.startDate}&endDate=${props.endDate}`
  if (props.loadingKeywordDataRequestInProgress !== urlWithString) {
    props.setLoadingKeywordDataRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; totalResults: number; pageNumber: number; resultsPerPage: number; data: WordCloudType.Data[] }
    }).then(function complete(results) {
      props.onKeywordsRequestCompleteHandler(results.data, results.pageNumber, results.resultsPerPage, results.totalResults)
    })
  }
  return <></>
}

interface ISubmitKeywordsProps {
  variablesFilter: variablesFilterObject
  startDate: string
  endDate: string
  setLoadingKeywordDataRequestInProgress: Dispatch<SetStateAction<string>>
  loadingKeywordDataRequestInProgress: string
  onKeywordsRequestCompleteHandler: (data: WordCloudType.Data[], pageNumber: number, resultsPerPage: number, totalResults: number) => void
}
