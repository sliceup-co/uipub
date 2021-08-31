/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/layout/Footer/Footer.tsx
*/

import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useStyles } from './Footer.styles'
import './Footer.scss'

const bottomImage = require('../../logo.png')

function NestedGrid() {
  const classes = useStyles()
  const footerClasses = classNames({
    [classes.footer]: true,
  })
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.right}>
          &copy; {new Date().getFullYear()} SliceUp | <Link to="/privacy">Privacy Statement</Link>
        </div>
        <div className={classes.img}>
          <img alt="bottomImage" className="footer-logo" src={bottomImage} />
        </div>
      </div>
    </footer>
  )
}

const Footer: FunctionComponent<TFooterProps> = () => (
  <nav className="light">
    <NestedGrid />
  </nav>
)

export type TFooterProps = {}

export default Footer
