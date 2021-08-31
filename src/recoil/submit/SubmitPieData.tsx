/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/SubmitPieData.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import { Types as DonutType } from '../../widgets/DonutChartWidget/types'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'

export function SubmitPieData(props: ISubmitPieDataProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_pie_data')
  const urlWithString = `${URL}?metric=${props.pieMetric}`
  if (props.loadingPieDataRequestInProgress !== urlWithString) {
    props.setLoadingPieDataRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; metric: string; data: DonutType.Data[] }
    }).then(function complete(results) {
      props.onPieDataRequestCompleteHandler(results.data, results.metric)
    })
  }
  return <></>
}

interface ISubmitPieDataProps {
  pieMetric: string
  loadingPieDataRequestInProgress: string
  setLoadingPieDataRequestInProgress: Dispatch<SetStateAction<string>>
  onPieDataRequestCompleteHandler: (data: DonutType.Data[], metric: string) => void
}
