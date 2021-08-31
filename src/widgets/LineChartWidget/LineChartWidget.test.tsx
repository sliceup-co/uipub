/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/LineChartWidget/LineChartWidget.test.tsx
*/

import React from 'react'
import { shallow } from 'enzyme'
import LineChartWidget from './LineChartWidget'

describe('<LineChartWidget />', () => {
  let component

  beforeEach(() => {
    component = shallow(<LineChartWidget />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
