/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/BarChartWidget/BarChartWidget.tsx
*/

import React, { useEffect, useRef } from 'react'
import './BarChartWidget.scss'
import { Types } from './types'
import useWindowDimensions from '../../hooks/WindowDimensions'

// TODO EE: Update Chart, ChartHelper to actual component Template & helper
import BarChart from '../../components/BarChart/BarChart'
import ChartHelper from '../../components/BarChart/BarChartHelper'

const BarChartWidget = (props: IBarChartWidgetProps) => {
  const { width, height } = useWindowDimensions()

  const dimensions = useRef() as { current: Types.Dimensions }
  dimensions.current = ChartHelper.getDimensions(width * 0.5, height * 0.5, 50, 50, 10, 20)

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current = ChartHelper.getDimensions(width * 0.5, height * 0.5, 50, 50, 10, 20)
    // console.log(dimensions.current)
  }, [width, height, dimensions])

  return (
    <>
      {props.data.length > 1 ? (
        <>
          <h3>Entries Over Time</h3>
          <span>Click a bar to filter by day</span>
          <BarChart dimensions={dimensions.current} data={props.data} propertiesNames={['date', 'value']} onDateSelectedHandler={props.onDateSelectedHandler} />
        </>
      ) : (
        <>Loading</>
      )}
    </>
  )
}
export default BarChartWidget

interface IBarChartWidgetProps {
  data: Types.Data[]
  onDateSelectedHandler: (date: string) => void
}
