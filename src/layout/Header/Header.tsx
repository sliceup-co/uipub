// src/layout/Header/Header.tsx

import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import './Header.scss'
import { NavLink } from 'react-router-dom'
import HeaderDrawer from './HeaderDrawer'
import HeaderTopNav from './HeaderTopNav'

export default class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Toolbar>
        <div style={{ width: '100%', height: '80px' }}>
          <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
              <NavLink id="navHome" className="text-dark active" to="/">
                <div className="logo-btn logo-wrapper">
                  <NavLink id="navHome" className="text-dark active" to="/">
                    <img className="app-logo-top" src="../../logo.png" alt="logo" />
                  </NavLink>
                </div>
              </NavLink>
            </Box>
            <Box p={1}>{this.props.smallBreakPoint ? <nav /> : <HeaderTopNav />}</Box>
            <Box p={1}>
              <div
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '10px',
                }}
              >
                <HeaderDrawer />
              </div>
            </Box>
          </Box>
        </div>
      </Toolbar>
    )
  }
}

interface IHeaderProps {
  smallBreakPoint: boolean
}

interface IHeaderState {}
