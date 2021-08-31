/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/AboutPage/AboutPage.test.tsx

Created with;
$ npx generate-react-cli component AboutPage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import AboutPage from './AboutPage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/AboutPage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<AboutPage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<AboutPage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
