/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/SubmitCategories.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'
import { Types } from '../../types'

export function SubmitCategories(props: ISubmitCategoriesProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_templates_categories')
  const urlWithString = `${URL}`
  if (props.loadingCategoriesDataRequestInProgress !== urlWithString) {
    props.setLoadingCategoriesDataRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; data: Types.CategoriesData[] }
    }).then(function complete(results) {
      props.onCategoriesRequestCompleteHandler(results.data)
    })
  }
  return <></>
}

interface ISubmitCategoriesProps {
  setLoadingCategoriesDataRequestInProgress: Dispatch<SetStateAction<string>>
  loadingCategoriesDataRequestInProgress: string
  onCategoriesRequestCompleteHandler: (data: Types.CategoriesData[]) => void
}
