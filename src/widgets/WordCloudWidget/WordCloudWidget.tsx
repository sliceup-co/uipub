/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/widgets/WordCloudWidget/WordCloudWidget.tsx

Created with;
$ npx generate-react-cli component WordCloudWidget --type=d3Widget

*/

import React, { useEffect, useRef, useState } from 'react'
import './WordCloudWidget.scss'
import { Types } from './types'
import useWindowDimensions from '../../hooks/WindowDimensions'

import WordCloud from '../../components/WordCloud/WordCloud'
import ChartHelper from '../../components/WordCloud/WordCloudHelper'

const WordCloudWidget = (props: IWordCloudWidgetProps) => {
  const [propertiesNames] = useState(['text', 'value'])

  const { width, height } = useWindowDimensions()

  const dimensions = useRef() as { current: Types.Dimensions }
  dimensions.current = ChartHelper.getDimensions(width * 0.9, height * 0.8, 30, 50, 10, 20)

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current = ChartHelper.getDimensions(width * 0.9, height * 0.8, 30, 50, 10, 20)
    // console.log(dimensions.current)
  }, [width, height, dimensions])

  return (
    <>
      {props.data && props.data.length > 1 ? (
        <>
          <h3>Top Keywords Used In Template</h3>
          <span>Click a keyword to filter results</span>
          <WordCloud dimensions={dimensions.current} data={props.data} propertiesNames={propertiesNames} onWordCloudKeywordsSelectedHandler={props.onWordCloudKeywordsSelectedHandler} />
        </>
      ) : (
        <>Loading</>
      )}
    </>
  )
}

interface IWordCloudWidgetProps {
  data: Types.Data[]
  onWordCloudKeywordsSelectedHandler: (str: string) => void
}

export default WordCloudWidget
