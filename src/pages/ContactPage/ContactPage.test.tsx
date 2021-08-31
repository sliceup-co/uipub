/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/ContactPage/ContactPage.test.tsx

Created with;
$ npx generate-react-cli component ContactPage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import ContactPage from './ContactPage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/ContactPage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<ContactPage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<ContactPage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
