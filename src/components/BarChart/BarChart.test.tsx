/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/BarChart/BarChart.test.tsx
*/

import React from 'react'
import { shallow } from 'enzyme'
import BarChart from './BarChart'

describe('<BarChart />', () => {
  let component

  beforeEach(() => {
    component = shallow(<BarChart />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
