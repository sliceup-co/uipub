/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/ChartWidget/BrushChartWidget.tsx

Created with;
$ npx generate-react-cli component BrushChartWidget --type=d3Widget

*/

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useSetRecoilState } from 'recoil'
import { Button } from '@material-ui/core'
import { Types } from './types'
import useWindowDimensions from '../../hooks/WindowDimensions'
import ChartHelper from '../../components/Brush/BrushChartHelper'
import Brush from '../../components/Brush/Brush'
import { initToast, notificationTypesEnums, randomToastId } from '../../model'
import { toastState } from '../../recoil/atoms/toastAtoms'

const BrushChartWidget = (props: IBrushChartWidgetProps) => {

  const [data, setData] = useState<Types.Data[]>([{ date: '', value: 0 }])
  const [propertiesNames] = useState(['date', 'value'])
  const { width, height } = useWindowDimensions()
  const [zoomed, setZoomed] = useState(false)

  // Toast
  const setToastState = useSetRecoilState(toastState)

  const dimensions = useRef() as { current: Types.Dimensions }
  dimensions.current = ChartHelper.getDimensions(width * 0.9, height * 0.25, 50, 50, 10, 50)

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current = ChartHelper.getDimensions(width * 0.9, height * 0.5, 50, 50, 10, 50)
    // console.log(dimensions.current)
  }, [width, height, dimensions])

  useEffect(() => {
    if (data.length <= 1 && props.data.length > 1)
      setData(props.data)
  }, [data.length, props.data])

  const onBrushUpdateData = (values: Date[]) => {
    // console.log(`${values[0].toDateString()  }, ${  values[1].toDateString()}`)
    let newData
    // eslint-disable-next-line prefer-const
    newData = []
    for (let i = 0; i < data.length; i++) {
      // const check = data[i].date as unknown as Date
      const check = d3.timeParse('%e/%d/%y')(data[i].date as unknown as string)
      // @ts-ignore
      if (check >= values[0] && check <= values[1]) {
        newData.push(data[i])
      }
    }
    // eslint-disable-next-line no-console
    if (newData.length > 1) {
      // console.log(`newData: ${  newData.length}`)
      setData(newData)
      setZoomed(true)
      props.onDateSelectedHandler(newData[0].date as string) // format: 5/12/21
    } else {
      setToastState(initToast(randomToastId(), notificationTypesEnums.Info, 'Maximum Zoom Reached!'))
    }
  }

  return (
    <>
      {data.length > 1 ? (
        <>
          <h3>Entries Over Time With Zoom</h3>

          {zoomed ? (
            <Button
              onClick={() => {
                setZoomed(false)
                setData(props.data)
              }}
            >
              Reset Zoom
            </Button>
          ) : (
            <span>Select a date to zoom</span>
          )}
          <Brush
            dimensions={dimensions.current}
            data={data}
            onBrushUpdateData={onBrushUpdateData}
            propertiesNames={propertiesNames}
            fill="tomato"
            stroke="rgb(47, 74, 89)"
            focusHeight={100}
          />
        </>
      ) : (
        <>Loading</>
      )}
    </>
  )
}
export default BrushChartWidget

interface IBrushChartWidgetProps {
  data: Types.Data[]
  onDateSelectedHandler: (date: string) => void
}
