/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
File: src/selectors/logsOverTimeSelectors.ts

*/

import { selector } from 'recoil'
import SelectorsHelper, { CURRENT_ENVIRONMENT_TYPE } from './SelectorsHelper'

const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'get_logs_over_time')

export const getLogsOverTimeData = selector({
  key: 'GetLogsOverTimeData',
  get: async () => {
    return getData()
  },
})

const getData = () =>
  new Promise((resolve) =>
    fetch(URL).then((response) => {
      if (response.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(`Houston, we have a problem! ${response.status}`)
        return
      }
      response.json().then((data) => {
        const d = data.data
        resolve(d)
      })
    })
  )
