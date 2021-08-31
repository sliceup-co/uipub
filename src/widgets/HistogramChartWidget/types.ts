/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/HistogramChartWidget/types.ts
*/

export namespace Types {
  export type Data = {
    value: number
  }
  export type Dimensions = {
    width: number
    height: number
    margin: {
      left: number
      right: number
      top: number
      bottom: number
    }
    boundedWidth: number
    boundedHeight: number
  }
  export type BarsNode = {
    x0: number
    x1: number
    length: number
  }
}
