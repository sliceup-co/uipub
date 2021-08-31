/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/HistogramChart/HistogramChart.tsx

Created with;
$ npx generate-react-cli component HistogramChart --type=d3WidgetComponent

*/

import React, { useEffect, useCallback, useState } from 'react'
import './HistogramChart.scss'
import * as d3 from 'd3'
import { Types } from '../../widgets/HistogramChartWidget/types'
import HistogramChartHelper from './HistogramChartHelper'

const HistogramChart = (props: IHistogramChartProps) => {
  const [loaded, setLoaded] = useState(false)

  const [prevHeight, setPrevHeight] = useState(props.dimensions.height)
  const [prevWidth, setPrevWidth] = useState(props.dimensions.width)

  const memoizedDrawCallback = useCallback(() => {
    // d3.select('#div').selectAll('*').remove()
  }, [])

  const memoizedUpdateCallback = useCallback(() => {
    const scales = HistogramChartHelper.getScales(props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)
    const bounds = d3.select('#histogram-bounds')
    // const helper = new HistogramChartHelper(props.propertiesNames)

    // Chart

    const histogram = d3
      .bin()
      .value((d) => {
        return (d as unknown as Types.Data).value as number
      })
      .thresholds(scales.xScale.ticks(props.numberOfTicks))

    const bins = histogram(props.data as Array<never>)

    const yAxisMaxValues = d3.max(bins, (d) => {
      return d.length
    })

    scales.yScale.domain([0, yAxisMaxValues] as [number, number])

    const barsNode = bounds.select('#chart-group').selectAll<SVGRectElement, number[]>('rect').data(bins)

    barsNode
      .enter()
      .append('rect')
      .attr('class', 'histobar')
      .on('click', (event, d) => {
        props.onBinClickHandler(d as unknown as {date: string, value: number}[])
      })
      .merge(barsNode)
      .transition()
      .duration(750)
      .attr('transform', (d) => {
        return `translate(
          ${scales.xScale((d as Types.BarsNode).x0)},
          ${scales.yScale((d as Types.BarsNode).length)}
        )`
      })
      .attr('width', (d) => {
        return scales.xScale((d as Types.BarsNode).x1) - scales.xScale((d as Types.BarsNode).x0) - 1
      })
      .attr('height', (d) => {
        return props.dimensions.boundedHeight - scales.yScale(d.length)
      })
      .attr('fill', 'tomato')
      .style('cursor', 'pointer')

    barsNode.exit().remove()

    // Peripherals

    // yAxis
    const yAxisGenerator = d3.axisLeft(scales.yScale)
    bounds
      .select('#histogram-y-axis')
      .transition()
      .duration(750)
      // @ts-ignore
      .call(yAxisGenerator)

    // xAxis
    const xAxisGenerator = d3.axisBottom(scales.xScale)
    bounds
      .select('#histogram-x-axis')
      // @ts-ignore
      .call(xAxisGenerator)
      .style('transform', `translateY(${props.dimensions.boundedHeight}px)`)
  }, [props])

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    } else {
      memoizedUpdateCallback()
    }
  }, [loaded, memoizedDrawCallback, memoizedUpdateCallback])

  useEffect(() => {
    const isNewHeight = prevHeight !== props.dimensions.height
    const isNewWidth = prevWidth !== props.dimensions.width
    if ((isNewHeight || isNewWidth) && loaded) {
      setPrevWidth(props.dimensions.height)
      setPrevHeight(props.dimensions.width)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    }
  }, [loaded, memoizedDrawCallback, memoizedUpdateCallback, prevHeight, prevWidth, props.dimensions.height, props.dimensions.width])

  return (
    <div id="div">
      <svg id="histogram-wrapper" width={props.dimensions.width} height={props.dimensions.height}>
        <g id="histogram-bounds" style={{ transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)` }}>
          <g id="chart-group" />
          <g id="histogram-x-axis" />
          <g id="histogram-y-axis" />
          <text x="3" y={props.dimensions.margin.top - 10} fontSize={8}>
            Days
          </text>
          <text x={props.dimensions.boundedWidth} y={props.dimensions.boundedHeight + 15} fontSize={8}>
            Logs
          </text>
        </g>
      </svg>
    </div>
  )
}

interface IHistogramChartProps {
  dimensions: Types.Dimensions
  data: Types.Data[]
  propertiesNames: string[]
  numberOfTicks: number
  onBinClickHandler: (d: {date: string, value: number}[]) => void
}

export default HistogramChart
