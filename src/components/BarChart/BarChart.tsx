/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/BarChart/BarChart.tsx
*/

import React, { useEffect, useCallback, useState } from 'react'
import './BarChart.scss'
import * as d3 from 'd3'
import { Button } from '@material-ui/core'
import { Types } from '../../widgets/BarChartWidget/types'
import BarChartHelper from './BarChartHelper'

const BarChart = (props: IBarChartProps) => {
  const [loaded, setLoaded] = useState(false)

  const [prevHeight, setPrevHeight] = useState(props.dimensions.height)
  const [prevWidth, setPrevWidth] = useState(props.dimensions.width)
  // eslint-disable-next-line no-unused-vars
  const [dateSelected, setDateSelected] = useState('')

  const memoizedDrawCallback = useCallback(() => {
    d3.selectAll('rect').remove()
  }, [])

  const memoizedUpdateCallback = useCallback(() => {
    const scales = BarChartHelper.getScales(props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)
    const bounds = d3.select('#bar-bounds')

    // Chart
    d3.select('#bars')
      .selectAll('.bar')
      .data(props.data)
      .enter()
      .append('rect')
      .style('cursor', 'pointer')
      .attr('fill', 'url(#gradient)')
      .attr('class', 'bar')
      .attr('x', (d) => {
        return scales.xScale(d.date as unknown as string) || 0
      })
      .attr('y', (d) => {
        return scales.yScale(d.value as unknown as number) || 0
      })
      .attr('width', scales.xScale.bandwidth())
      .attr('height', (d) => {
        return props.dimensions.boundedHeight - scales.yScale(d.value as number)
      })
      .attr('id', (d) => {
        return `bar-${  (d.date)?.replaceAll('/', '')}`
      })
      .on('click', (event) => {
        event.stopPropagation()
        const [x] = d3.pointer(event)
        // const value = scales.yScale.invert(y)

        props.data.forEach((val, index) => {
          const barId = `#bar-${  (val.date as string).replaceAll('/', '')}`
          d3.select(barId)
            .attr('fill', 'url(#gradient)')
        })

        // invert band
        const eachBand = scales.xScale.step()
        const index = Math.floor((x / eachBand))
        const date = scales.xScale.domain()[index]
        setDateSelected(date)
        d3.select(`#bar-${  date.replaceAll('/', '')}`)
          .attr('fill', 'hsl(88, 80%, 50%)')

        props.onDateSelectedHandler(date) // format: 5/12/21
      })

    const helper = new BarChartHelper(props.propertiesNames)
    const mean = d3.mean(props.data, helper.yAccessor) as number
    const meanToY = scales.yScale(mean)

    d3.selectAll('#bar-mean').attr('x1', 0).attr('x2', props.dimensions.boundedWidth).attr('y1', meanToY).attr('y2', meanToY)

    d3.selectAll('#bar-mean-text')
      .attr('x', props.dimensions.boundedWidth - 40)
      .attr('y', meanToY - 10)
      .text(`mean ${mean.toFixed(2)}`)

    // yAxis
    const yAxisGenerator = d3.axisLeft(scales.yScale)
    bounds
      .select('#bar-y-axis')
      // @ts-ignore
      .call(yAxisGenerator)

    // xAxis
    const xAxisGenerator = d3.axisBottom(scales.xScale)
    bounds
      .select('#bar-x-axis')
      // @ts-ignore
      .call(xAxisGenerator)
      .style('transform', `translateY(${props.dimensions.boundedHeight}px)`)

    // interactions

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
    if (isNewHeight || isNewWidth) {
      setPrevWidth(props.dimensions.height)
      setPrevHeight(props.dimensions.width)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    }
  }, [dateSelected, setDateSelected, memoizedDrawCallback, memoizedUpdateCallback, prevHeight, prevWidth, props.dimensions.height, props.dimensions.width])

  return (
    <div id="div">
      <svg id="bar-wrapper" width={props.dimensions.width} height={props.dimensions.height}>
        <defs>
          <linearGradient id="gradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(20, 100%, 50%)" />
            <stop offset="50%" stopColor="hsl(20, 50%, 50%)" />
            <stop offset="100%" stopColor="hsl(20, 25%, 50%)" />
          </linearGradient>
        </defs>
        <g id="bar-bounds" style={{ transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)` }}>
          <g id="bars" />
          <g id="bar-x-axis" />
          <g id="bar-y-axis" />
          <line id="bar-mean" className="bar-mean" />
          <text id="bar-mean-text" className="bar-mean-text" />
        </g>
      </svg>
      {dateSelected !== '' ? (
        <Button
          onClick={() => {
            props.data.forEach((val, index) => {
              const barId = `#bar-${  (val.date as string).replaceAll('/', '')}`
              d3.select(barId)
                .attr('fill', 'url(#gradient)')
            })
          }}
        >
          Clear Selection
        </Button>
      ) : (
        <Button disabled>Clear Selection</Button>
      )}
    </div>
  )
}

interface IBarChartProps {
  dimensions: Types.Dimensions
  data: Types.Data[]
  propertiesNames: string[]
  onDateSelectedHandler: (date: string) => void
}

export default BarChart
