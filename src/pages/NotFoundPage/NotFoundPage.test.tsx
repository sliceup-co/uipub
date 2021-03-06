/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/NotFoundPage/NotFoundPage.test.tsx

Created with;
$ npx generate-react-cli component NotFoundPage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from './NotFoundPage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/NotFoundPage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<NotFoundPage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<NotFoundPage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
