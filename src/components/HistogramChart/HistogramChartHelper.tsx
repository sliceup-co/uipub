/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/HistogramChartHelper/HistogramChartHelper.tsx

Implement - pass metric:
const helper = new HistogramChartHelper(props.propertiesNames)

*/

import * as d3 from 'd3'
import { Types } from '../../widgets/HistogramChartWidget/types'

export default class HistogramChartHelper {
  private readonly metric: string[]

  constructor(metric: string[]) {
    this.metric = metric
  }

  // @ts-ignore
  public xAccessor = (d: Types.Data) => d[this.metric[0]]

  static getDimensions = (width: number, height: number, left: number, right: number, top: number, bottom: number) => {
    const dimensions = {
      width,
      height,
      margin: {
        left,
        right,
        top,
        bottom,
      },
      boundedWidth: 0,
      boundedHeight: 0,
    }
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    return dimensions
  }

  static getScales = (data: Types.Data[], width: number, height: number, metric: string[]) => {
    const helper = new HistogramChartHelper(metric)
    const maxValue = Math.max(...data.map(helper.xAccessor, 0)) + 75
    return {
      xScale: d3.scaleLinear().domain([0, maxValue]).range([0, width]),
      yScale: d3.scaleLinear().range([height, 0]).nice(),
    }
  }
}
