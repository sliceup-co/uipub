/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/selectors/templatesSelectors.ts

You need to build a production or copy file to public/data:
make sure it works locally: http://localhost:3000/data/get_templates.json
*/

import { selector } from 'recoil'
import axios from 'axios'
import { Types } from '../../types'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from './SelectorsHelper'
import { templateState } from '../atoms/templateAtoms'

export const  getTemplateData = selector({
  key: 'GetTemplateData',
  get: async ({ get }) => {
    const payload = get(templateState)
    if (payload.pageNumber === 0 || payload.resultsPerPage === 0) return []
    try {
      const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_templates_paginated')
      const urlWithString = `${URL}?pageNumber=${payload.pageNumber}&resultsPerPage=${payload.resultsPerPage}&time=${new Date().toISOString()}`
      const res = await axios({
        url: urlWithString,
        method: 'get',
      })
      return res?.data as { status: string; totalResults: number; data: Types.TemplateData[] }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Houston, we have a problem! ${err}`)
      return `Error: ${err}`
    }
  },
})
