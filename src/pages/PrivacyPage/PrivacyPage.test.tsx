/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/PrivacyPage/PrivacyPage.test.tsx

Created with;
$ npx generate-react-cli component PrivacyPage --type=page

*/

import React from 'react'
import { shallow } from 'enzyme'
import PrivacyPage from './PrivacyPage'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/PrivacyPage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: {} as any,
}
describe('<PrivacyPage />', () => {
  let component

  beforeEach(() => {
    component = shallow(<PrivacyPage {...routeComponentPropsMock} />)
  })

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
