/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/BarChartHelper/BarChartHelper.tsx

Implement - pass metric:
const helper = new BarChartHelper(string[])

*/

import * as d3 from 'd3'
import { Types } from '../../widgets/BarChartWidget/types'

export default class BarChartHelper {
  private readonly metric: string[]

  constructor(metric: string[]) {
    this.metric = metric
  }

  // EE: if you need a date accessor;
  // static dateParser = d3.timeParse('%Y-%m-%d')
  // xAccessor = (d: Types.Data) => BarChartHelper.dateParser(d[this.metric[0]] as string)

  // @ts-ignore
  public xAccessor = (d: Types.Data) => d[this.metric[0]]

  // @ts-ignore
  public yAccessor = (d: Types.Data) => d[this.metric[1]]

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
    const helper = new BarChartHelper(metric)
    return {
      xScale: d3.scaleBand().range([0, width]).padding(0.2).domain(data.map(helper.xAccessor)),
      yScale: d3
        .scaleLinear()
        .range([height, 0])
        .domain([
          0,
          d3.max(data, (d) => {
            return Math.max(...data.map(helper.yAccessor), 0)
          }),
        ] as number[])
        .nice(),
    }
  }
}
