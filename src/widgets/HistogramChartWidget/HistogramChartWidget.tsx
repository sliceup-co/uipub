/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/HistogramChartWidget/HistogramChartWidget.tsx

Created with;
$ npx generate-react-cli component HistogramChartWidget --type=d3Widget

*/

import React, { useEffect, useRef, useState } from 'react'
import './HistogramChartWidget.scss'
import { Typography } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'
import { Types } from './types'
import useWindowDimensions from '../../hooks/WindowDimensions'

import HistogramChart from '../../components/HistogramChart/HistogramChart'
import ChartHelper from '../../components/HistogramChart/HistogramChartHelper'
import HistogramBinModal from '../../components/HistogramBinModal/HistogramBinModal'

const HistogramChartWidget = (props: IHistogramChartWidgetProps) => {
  const [propertiesNames] = useState(['value'])

  const { width, height } = useWindowDimensions()
  const [numberOfTicks, setNumberOfTicks] = useState(10)
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedBin, setSelectedBin] = React.useState<{date: string, value: number}[]>([{ date: '', value: 0}])

  const dimensions = useRef() as { current: Types.Dimensions }
  dimensions.current = ChartHelper.getDimensions(width * 0.4, height * 0.34, 50, 50, 10, 20)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    const value = newValue as number
    setNumberOfTicks(value)
  }

  const onBinClickHandler = (d: {date: string, value: number}[]) => {
    setSelectedBin(d)
    setOpenModal(true)
  }

  const setSelectedDate = (item: {date: string, value: number}) => {
    setOpenModal(false)
    props.onDateSelectedHandler(item.date)
  }

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current = ChartHelper.getDimensions(width * 0.4, height * 0.34, 50, 50, 10, 20)
    // console.log(dimensions.current)
  }, [width, height, dimensions])

  return (
    <>
      {props.data.length > 1 ? (
        <>
          <h3>Number of logs per days</h3>
          <span>Click a bar to select a day</span>
          <HistogramChart
            dimensions={dimensions.current}
            data={props.data}
            propertiesNames={propertiesNames}
            numberOfTicks={numberOfTicks}
            onBinClickHandler={onBinClickHandler}
          />
          <div className="sliderDiv">
            <Typography gutterBottom>Number of Bars</Typography>
            <Slider
              defaultValue={numberOfTicks}
              getAriaValueText={(value: number) => {
                return `${value} ticks`
              }}
              valueLabelDisplay="auto"
              aria-labelledby="discrete-slider"
              marks
              step={10}
              min={10}
              max={50}
              onChange={handleChange}
            />
            <HistogramBinModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              selectedBin={selectedBin}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </>
  )
}
export default HistogramChartWidget

interface IHistogramChartWidgetProps {
  data: Types.Data[]
  onDateSelectedHandler: (date: string) => void
}
