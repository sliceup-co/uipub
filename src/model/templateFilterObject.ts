/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/model/templateFilterObject.ts
*/

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface templateFilterObject {
  pageNumber: number
  resultsPerPage: number
}

export const initTemplateFilterObject = (): templateFilterObject => ({
  pageNumber: 0,
  resultsPerPage: 0,
})
