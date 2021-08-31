/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/selectors/variablesSelectors.ts

*/

import { selector } from 'recoil'
import axios from 'axios'
import { Types } from '../../types'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from './SelectorsHelper'
import { variableState } from '../atoms/variablesAtoms'

export const getVariableData = selector({
  key: 'GetVariableData',
  get: async ({ get }) => {
    const payload = get(variableState)
    if (payload.pageNumber === 0 || payload.resultsPerPage === 0) return []
    try {
      const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_variable_data_paginated')
      const urlWithString = `${URL}?pageNumber=${payload.pageNumber}&resultsPerPage=${payload.resultsPerPage}&startDate=${payload.startDate}&endDate=${
        payload.endDate
      }&time=${new Date().toISOString()}`
      const res = await axios({
        url: urlWithString,
        method: 'get',
      })
      return res?.data as { status: string; data: Types.VariablesData[] }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Houston, we have a problem! ${err}`)
      return `Error: ${err}`
    }
  },
})
