/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/WordCloudWidget/types.ts

Created with;
$ npx generate-react-cli component WordCloudWidget --type=d3Widget

*/

export namespace Types {
  export type Data = {
    text?: string
    value?: number
  }
  export type Word = {
    text?: string
    font?: string
    style?: string
    weight?: string | number
    rotate?: number
    size?: number
    padding?: number
    x?: number
    y?: number
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
