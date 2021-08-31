/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/DonutChartWidget/DonutChartWidget.tsx

Created with;
$ npx generate-react-cli component DonutChartWidget --type=d3Widget

*/

import React, { useEffect, useRef, useState } from 'react'
import './DonutChartWidget.scss'
import { Types } from './types'
import useWindowDimensions from '../../hooks/WindowDimensions'

import DonutChart from '../../components/DonutChart/DonutChart'
import ChartHelper from '../../components/DonutChart/DonutChartHelper'
import MetricSelectDropDown from '../../components/MetricSelectDropDown/MetricSelectDropDown'

const DonutChartWidget = (props: IDonutChartWidgetProps) => {
  const [propertiesNames] = useState(['name', 'value'])

  const { width, height } = useWindowDimensions()

  const dimensions = useRef() as { current: Types.Dimensions }
  dimensions.current = ChartHelper.getDimensions(width * 0.5, height * 0.415, 10, 10, 10, 20)

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current = ChartHelper.getDimensions(width * 0.5, height * 0.415, 50, 10, 10, 20)
    // console.log(dimensions.current)
  }, [width, height, dimensions])

  return (
    <>
      {!props.loadingPieData ? (
        <>
          <h3>Donut Pie By Metric</h3>
          <MetricSelectDropDown onPieMetricChangeHandler={props.onPieMetricChangeHandler} metricSelected={props.metricSelected} />
          <DonutChart dimensions={dimensions.current} data={props.data} propertiesNames={propertiesNames} />
        </>
      ) : (
        <div style={{ height: 372 }}>
          <img className="spinner" src="../../../loader-spinner.png" alt="loader-spinner" />
        </div>
      )}
    </>
  )
}
export default DonutChartWidget

interface IDonutChartWidgetProps {
  loadingPieData: boolean
  data: Types.Data[]
  onPieMetricChangeHandler: (metric: string) => void
  metricSelected: string
}
