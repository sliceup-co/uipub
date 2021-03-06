/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/LineChartWidget/types.ts
*/

export namespace Types {
  export type Data = {
    value: number
    date: string
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
}
