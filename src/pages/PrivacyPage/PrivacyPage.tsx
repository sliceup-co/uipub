/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/PrivacyPage/PrivacyPage.tsx

Created with;
$ npx generate-react-cli component PrivacyPage --type=page

*/

import React from 'react'
import './PrivacyPage.scss'
import { RouteComponentProps } from 'react-router-dom'

export default class PrivacyPage extends React.PureComponent<IPrivacyPageProps, IPrivacyPageState> {
  constructor(props: IPrivacyPageProps) {
    super(props)
    this.state = {
      name: this.props.history.location.pathname.substring(1, this.props.history.location.pathname.length).replace('/', ''),
    }
  }

  // If you need 'shouldComponentUpdate' -> Refactor to React.Component
  // Read more about component lifecycle in the official docs:
  // https://reactjs.org/docs/react-component.html

  /*
  public shouldComponentUpdate(nextProps: IMyPageProps, nextState: IMyPageState) {
    // invoked before rendering when new props or state are being received.
    return true // or prevent rendering: false
  } */

  static getDerivedStateFromProps: React.GetDerivedStateFromProps<IPrivacyPageProps, IPrivacyPageState> = (props: IPrivacyPageProps, state: IPrivacyPageState) => {
    // invoked right before calling the render method, both on the initial mount and on subsequent updates
    // return an object to update the state, or null to update nothing.
    return null
  }

  public getSnapshotBeforeUpdate(prevProps: IPrivacyPageProps, prevState: IPrivacyPageState) {
    // invoked right before the most recently rendered output is committed
    // A snapshot value (or null) should be returned.
    return null
  }

  componentDidUpdate(prevProps: IPrivacyPageProps, prevState: IPrivacyPageState, snapshot: IPrivacyPageSnapshot) {
    // invoked immediately after updating occurs. This method is not called for the initial render.
    // will not be invoked if shouldComponentUpdate() returns false.
  }

  render() {
    return <div className="PrivacyPage">{this.state.name} Component</div>
  }
}

interface IPrivacyPageProps extends RouteComponentProps<{ name: string }> {
  // TODO
}

interface IPrivacyPageState {
  name: string
}

interface IPrivacyPageSnapshot {
  // TODO
}
