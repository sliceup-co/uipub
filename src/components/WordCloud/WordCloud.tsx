/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/WordCloud/WordCloud.tsx

Created with;
$ npx generate-react-cli component WordCloud --type=d3WidgetComponent

yarn add d3 @types/d3
yarn add d3-cloud @types/d3-cloud

*/

import React, { useEffect, useCallback, useState } from 'react'
import './WordCloud.scss'
import * as d3 from 'd3'
import { Button } from '@material-ui/core'
import { Types } from '../../widgets/WordCloudWidget/types'
import WordCloudHelper from './WordCloudHelper'

const WordCloud = (props: IWordCloudProps) => {
  const [loaded, setLoaded] = useState(false)

  const [prevHeight, setPrevHeight] = useState(props.dimensions.height)
  const [prevWidth, setPrevWidth] = useState(props.dimensions.width)

  const [data, setData] = useState<Types.Data[]>([{ text: '', value: 0 }])

  const [wordSelected, setWordSelected] = useState(false)

  const memoizedDrawCallback = useCallback(() => {
    d3.select('#chart-group').selectAll('*').remove()
  }, [])

  const memoizedUpdateCallback = useCallback(() => {
    const scales = WordCloudHelper.getScales(data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)

    const randomFillColor = () => {
      const x = Math.floor(Math.random() * 256)
      const y = 100 + Math.floor(Math.random() * 256)
      const z = 50 + Math.floor(Math.random() * 256)
      return `rgb(${x},${y},${z})`
    }

    // draw chart

    const draw = (layoutWords: Types.Word[]) => {
      let words: Types.Word[]
      // single word selected
      if (wordSelected) {
        words = [
          {
            text: data[0].text,
            size: 150,
          },
        ]
      } else {
        // all words
        words = layoutWords
      }
      d3.select('#chart-group')
        .append('svg')
        .attr('id', 'chart-group-svg')
        .attr('width', layout.size()[0])
        .attr('height', layout.size()[1])
        .append('g')
        .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .attr('id', (d) => {
          // @ts-ignore
          return `${d.text}-text`
        })
        .style('fill', randomFillColor)
        .style('font-size', (d) => {
          // @ts-ignore
          return `${d.size}px`
        })
        .style('cursor', 'pointer')
        .style('font-family', 'Roboto')
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => {
          // @ts-ignore
          return `translate(${[d.x, d.y]})rotate(${d.rotate})`
        })
        // @ts-ignore
        .text((d) => {
          return d.text
        })
        .on('click', (evt, d) => {
          setWordSelected(true)
          const { text } = d
          setData([
            {
              text,
              value: 10,
            },
          ])
          // @ts-ignore
          props.onWordCloudKeywordsSelectedHandler(text)
        })
        .on('mouseover', (evt, d) => {
          // @ts-ignore
          const id = `#${d.text}-text`
          d3.selectAll(id).style('text-decoration', 'underline')
        })
        .on('mouseout', (evt, d) => {
          // @ts-ignore
          const id = `#${d.text}-text`
          d3.selectAll(id).style('text-decoration', 'none')
        })
    }
    const layout = scales.layout.on('end', draw)
    layout.start()
  }, [data, props, wordSelected])

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    } else {
      memoizedDrawCallback()
      memoizedUpdateCallback()
    }
  }, [loaded, memoizedDrawCallback, memoizedUpdateCallback])

  useEffect(() => {
    if (!wordSelected && JSON.stringify(props.data) !== JSON.stringify(data)) {
      setData(props.data)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    }
  }, [data, loaded, memoizedDrawCallback, memoizedUpdateCallback, props.data, wordSelected])

  useEffect(() => {
    const isNewHeight = prevHeight !== props.dimensions.height
    const isNewWidth = prevWidth !== props.dimensions.width
    if (isNewHeight || isNewWidth) {
      setPrevWidth(props.dimensions.height)
      setPrevHeight(props.dimensions.width)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    }
  }, [memoizedDrawCallback, memoizedUpdateCallback, prevHeight, prevWidth, props.dimensions.height, props.dimensions.width])

  return (
    <div id="div">
      <svg id="wrapper" width={props.dimensions.width} height={props.dimensions.height}>
        <g id="bounds" style={{ transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)` }}>
          <g id="chart-group" />
        </g>
      </svg>
      {wordSelected ? (
        <Button
          onClick={() => {
            setData(props.data)
            setWordSelected(false)
          }}
        >
          Clear Selected Word
        </Button>
      ) : (
        <Button disabled>Clear Selected Word</Button>
      )}
    </div>
  )
}

interface IWordCloudProps {
  dimensions: Types.Dimensions
  data: Types.Data[]
  propertiesNames: string[]
  onWordCloudKeywordsSelectedHandler: (str: string) => void
}

export default WordCloud
