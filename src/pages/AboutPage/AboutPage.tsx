/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/AboutPage/AboutPage.tsx

Created with;
$ npx generate-react-cli component AboutPage --type=page

*/

import React from 'react'
import './AboutPage.scss'
import { RouteComponentProps } from 'react-router-dom'

export default class AboutPage extends React.PureComponent<IAboutPageProps, IAboutPageState> {
  constructor(props: IAboutPageProps) {
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

  static getDerivedStateFromProps: React.GetDerivedStateFromProps<IAboutPageProps, IAboutPageState> = (props: IAboutPageProps, state: IAboutPageState) => {
    // invoked right before calling the render method, both on the initial mount and on subsequent updates
    // return an object to update the state, or null to update nothing.
    return null
  }

  public getSnapshotBeforeUpdate(prevProps: IAboutPageProps, prevState: IAboutPageState) {
    // invoked right before the most recently rendered output is committed
    // A snapshot value (or null) should be returned.
    return null
  }

  componentDidUpdate(prevProps: IAboutPageProps, prevState: IAboutPageState, snapshot: IAboutPageSnapshot) {
    // invoked immediately after updating occurs. This method is not called for the initial render.
    // will not be invoked if shouldComponentUpdate() returns false.
  }

  render() {
    return <div className="AboutPage">{this.state.name} Component</div>
  }
}

interface IAboutPageProps extends RouteComponentProps<{ name: string }> {
  // TODO
}

interface IAboutPageState {
  name: string
}

interface IAboutPageSnapshot {
  // TODO
}
