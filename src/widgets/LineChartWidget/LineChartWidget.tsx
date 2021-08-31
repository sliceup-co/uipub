/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/LineChartWidget/LineChartWidget.tsx
*/

import React, { useEffect, useRef } from 'react'
import './LineChartWidget.scss'
import { Types } from './types'
import useWindowDimensions from '../../hooks/WindowDimensions'

import LineChart from '../../components/LineChart/LineChart'
import ChartHelper from '../../components/LineChart/LineChartHelper'

const LineChartWidget = (props: ILineChartWidgetProps) => {
  const { width, height } = useWindowDimensions()

  const dimensions = useRef() as { current: Types.Dimensions }
  dimensions.current = ChartHelper.getDimensions(width * 0.5, height * 0.5, 50, 70, 10, 20)

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current = ChartHelper.getDimensions(width * 0.5, height * 0.5, 50, 70, 10, 20)
    // console.log(dimensions.current)
  }, [width, height, dimensions])

  return (
    <>
      {props.data.length > 1 ? (
        <>
          <h3>Entries Over Time</h3>
          <span>Move mouse and Click to select a date</span>
          <LineChart dimensions={dimensions.current} data={props.data} propertiesNames={['date', 'value']} onDateSelectedHandler={props.onDateSelectedHandler} />
        </>
      ) : (
        <>Loading</>
      )}
    </>
  )
}
export default LineChartWidget

interface ILineChartWidgetProps {
  data: Types.Data[]
  onDateSelectedHandler: (date: string) => void
}
