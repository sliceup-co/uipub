/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/LineChart/LineChart.tsx
*/

import React, { useEffect, useCallback, useState } from 'react'
import './LineChart.scss'
import * as d3 from 'd3'
import { Button } from '@material-ui/core'
import { Types } from '../../widgets/LineChartWidget/types'
import LineChartHelper from './LineChartHelper'

const LineChart = (props: ILineChartProps) => {
  const [meanSelected, setMeanSelected] = useState(false)
  const [selectedMeanPosition, setSelectedMeanPosition] = useState({ x: 0, y: 0 })

  const onMouseMoveHandler = useCallback(
    (event: React.MouseEvent) => {
      const [x, y] = d3.pointer(event)
      const scales = LineChartHelper.getScales(props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)

      d3.select('#entries-mean').style('opacity', '1').attr('x1', 0).attr('x2', props.dimensions.boundedWidth).attr('y1', y).attr('y2', y)

      d3.select('#date-mean').style('opacity', '1').attr('x1', x).attr('x2', x).attr('y1', 0).attr('y2', props.dimensions.boundedHeight)

      const entries = scales.yScale.invert(y)
      const date = scales.xScale.invert(x)

      d3.select('#entries-text')
        .style('opacity', '1')
        .attr('x', props.dimensions.boundedWidth - 50)
        .attr('y', y - 10)
        .text(`entries ${entries.toFixed(2)}`)

      d3.select('#date-text')
        .style('opacity', '1')
        .attr('x', x + 40)
        .attr('y', 15)
        .text(`${date.toISOString().slice(0, 10)}`)
    },
    [props.data, props.dimensions.boundedHeight, props.dimensions.boundedWidth, props.propertiesNames]
  )

  const onMouseOutHandler = useCallback(() => {
    d3.selectAll('.line-mean').style('opacity', '0')
    d3.selectAll('.line-mean-text').style('opacity', '0')
  }, [])

  const drawSelectedMean = useCallback(() => {
    // const scales = LineChartHelper.getScales(props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)
    d3.select('#entries-mean').style('opacity', '1').attr('x1', 0).attr('x2', props.dimensions.boundedWidth).attr('y1', selectedMeanPosition.y).attr('y2', selectedMeanPosition.y)

    d3.select('#date-mean').style('opacity', '1').attr('x1', selectedMeanPosition.x).attr('x2', selectedMeanPosition.x).attr('y1', 0).attr('y2', props.dimensions.boundedHeight)
  }, [props.dimensions.boundedHeight, props.dimensions.boundedWidth, selectedMeanPosition.x, selectedMeanPosition.y])

  const onMouseClickHandler = useCallback(
    (event: React.MouseEvent) => {
      const [x, y] = d3.pointer(event)
      const scales = LineChartHelper.getScales(props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)
      const date = scales.xScale.invert(x)
      const dateAsString = (date as Date).toISOString().slice(0, 10)
      setMeanSelected(true)
      setSelectedMeanPosition({ x, y })
      d3.select('#line-bounds').selectAll('rect').remove()
      drawSelectedMean()
      props.onDateSelectedHandler(dateAsString)
    },
    [drawSelectedMean, props]
  )

  const memoizedUpdateCallback = useCallback(() => {
    const scales = LineChartHelper.getScales(props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)
    const lineBounds = d3.select('#line-bounds')

    const helper = new LineChartHelper(props.propertiesNames)

    // draw chart
    const linesGenerator = d3
      .line()
      // @ts-ignore
      .x((d) => scales.xScale(helper.xAccessor(d)))
      // @ts-ignore
      .y((d) => scales.yScale(helper.yAccessor(d)))

    d3.select('#path')
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      // @ts-ignore
      .attr('d', linesGenerator(props.data))

    // Peripherals

    // yAxis
    const yAxisGenerator = d3.axisLeft(scales.yScale)
    lineBounds
      .select('#line-y-axis')
      // @ts-ignore
      .call(yAxisGenerator)

    // xAxis
    const xAxisGenerator = d3.axisBottom(scales.xScale)
    lineBounds
      .select('#line-x-axis')
      // @ts-ignore
      .call(xAxisGenerator)
      .style('transform', `translateY(${props.dimensions.boundedHeight}px)`)

    if (!meanSelected) {
      lineBounds.selectAll('rect').remove()
      lineBounds
        .append('rect')
        .style('width', props.dimensions.boundedWidth)
        .style('height', props.dimensions.boundedHeight)
        .style('fill', '#00000000')
        .style('cursor', 'pointer')
        .style('transform', 'translate(0px, 0px)')
        .on('mousemove', (event) => {
          event.stopPropagation()
          onMouseMoveHandler(event)
        })
        .on('mouseout', (event) => {
          event.stopPropagation()
          onMouseOutHandler()
        })
        .on('click', (event) => {
          event.stopPropagation()
          onMouseClickHandler(event)
        })
    } else {
      drawSelectedMean()
    }

    // eslint-disable-next-line max-len
  }, [drawSelectedMean, props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames, meanSelected, onMouseMoveHandler, onMouseOutHandler, onMouseClickHandler])

  useEffect(() => {
    memoizedUpdateCallback()
  }, [memoizedUpdateCallback, props.data])

  return (
    <div id="div">
      <svg id="line-wrapper" width={props.dimensions.width} height={props.dimensions.height}>
        <g id="line-bounds" style={{ transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)` }}>
          <path id="path" />
          <g id="line-x-axis" />
          <g id="line-y-axis" />
          <line id="entries-mean" className="line-mean" />
          <line id="date-mean" className="line-mean" />
          <text id="entries-text" className="line-mean-text" />
          <text id="date-text" className="line-mean-text" />
        </g>
      </svg>
      {meanSelected ? (
        <Button
          onClick={() => {
            setMeanSelected(false)
          }}
        >
          Select Different Day
        </Button>
      ) : (
        <Button disabled>Clear Selected Day</Button>
      )}
    </div>
  )
}

interface ILineChartProps {
  dimensions: Types.Dimensions
  data: Types.Data[]
  propertiesNames: string[]
  onDateSelectedHandler: (date: string) => void
}

export default LineChart
