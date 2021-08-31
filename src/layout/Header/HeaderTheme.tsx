// src/layout/Header/HeaderTheme.tsx

import React, { FunctionComponent } from 'react'
import AppBar from '@material-ui/core/AppBar/AppBar'
import { useMediaQuery } from '@material-ui/core'
import HeaderComponent from './Header'

function appBarBackgroundStyle(color: string) {
  return {
    background: color,
  }
}

export const HeaderTheme: FunctionComponent = () => {
  const smallBreakPoint = useMediaQuery('(min-width: 0px) and (max-width: 700px)')
  return (
    <AppBar position="fixed" style={appBarBackgroundStyle('rgb(22,27,34)')}>
      <HeaderComponent smallBreakPoint={smallBreakPoint} />
    </AppBar>
  )
}
