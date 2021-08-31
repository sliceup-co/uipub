/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/MetricSelectDropDown/MetricSelectDropDown.test.tsx
*/

import React from 'react'
import { shallow } from 'enzyme'
import MetricSelectDropDown from './MetricSelectDropDown'

describe('<MetricSelectDropDown />', () => {
  let component

  beforeEach(() => {
    component = shallow(<MetricSelectDropDown />)
  });

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
