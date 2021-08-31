/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/BarChartWidget/BarChartWidget.test.tsx
*/

import React from 'react'
import { shallow } from 'enzyme'
import BarChartWidget from './BarChartWidget'

describe('<BarChartWidget />', () => {
  let component

  beforeEach(() => {
    component = shallow(<BarChartWidget />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
