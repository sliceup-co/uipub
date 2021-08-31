/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/recoil/submit/AddCategory.tsx
*/

import React, { Dispatch, SetStateAction } from 'react'
import * as d3 from 'd3'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from '../selectors/SelectorsHelper'
import { Types } from '../../types'

export function AddCategory(props: IAddCategoryProps) {
  const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'add_templates_category')
  const urlWithString = `${URL}?category=${props.category}`
  if (props.loadingAddCategoryRequestInProgress !== urlWithString) {
    props.setLoadingAddCategoryRequestInProgress(urlWithString)
    d3.json(urlWithString).then((d) => {
      return d as unknown  as { status: string; data: Types.CategoriesData[] }
    }).then(function complete(results) {
      props.onAddCategoryRequestCompleteHandler(results.data)
    })
  }
  return <></>
}

interface IAddCategoryProps {
  setLoadingAddCategoryRequestInProgress: Dispatch<SetStateAction<string>>
  loadingAddCategoryRequestInProgress: string
  onAddCategoryRequestCompleteHandler: (data: Types.CategoriesData[]) => void
  category: string
}
