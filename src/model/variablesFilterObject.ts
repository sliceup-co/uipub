/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/model/variablesFilterObject.ts
*/

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface variablesFilterObject {
  pageNumber: number
  resultsPerPage: number
  totalResults: number
  startDate: string
  endDate: string
  category: string
  templateName: string
}

export const initVariablesFilterObject = (): variablesFilterObject => ({
  pageNumber: 1,
  resultsPerPage: 5,
  totalResults: 0,
  startDate: '',
  endDate: '',
  category: '',
  templateName: ''
})
