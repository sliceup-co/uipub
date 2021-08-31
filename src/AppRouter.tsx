/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/AppRouter.tsx
*/

import React, { FunctionComponent, Suspense } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

// @ts-ignore
// eslint-disable-next-line import/extensions,import/no-extraneous-dependencies
import { withQuicklink } from 'quicklink/dist/react/hoc.js'
import { HeaderTheme } from './layout/Header/HeaderTheme'
import { FooterTheme } from './layout/Footer/FooterTheme'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import ContactPage from './pages/ContactPage/ContactPage'
import PrivacyPage from './pages/PrivacyPage/PrivacyPage'

import ScrollToTop from './hooks/ScrollToTop'

import App from './App'
import './AppRouter.scss'
import AppEmpty from './AppEmpty'
import ToastNotification from './components/Toast/ToastNotification'

const options = {
  origins: [],
}

const AppRouter: FunctionComponent = () => {
  return (
    <Router>
      <ScrollToTop />
      <RecoilRoot>
        <Suspense
          fallback={
            <>
              {/*
              <div className="home_loading_container">
                <div className="home_loading_container_icon app-logo-top">
                  <img className="app-logo-top" src="loader-spinner.png" alt="loader-spinner" />
                  <br />
                  <img className="app-logo-top" src="logo.png" alt="logo" />
                </div>
              </div>
              */}
              <HeaderTheme />
              <AppEmpty />
              <div className="footer">
                <FooterTheme />
              </div>
            </>
          }
        >
          <HeaderTheme />
          <Switch>
            <Route exact path="/" component={App} /* component={App} component={NetworksPage}  */ />
            <Route exact path="/Home" component={withQuicklink(HomePage, options)} />
            <Route exact path="/About" component={withQuicklink(AboutPage, options)} />
            <Route exact path="/Contact" component={withQuicklink(ContactPage, options)} />
            <Route path="/Privacy" component={withQuicklink(PrivacyPage, options)} />
            <Route path="/404" component={withQuicklink(NotFoundPage, options)} />
            <Redirect to="/404" />
          </Switch>
          <ToastNotification />
          <div className="footer">
            <FooterTheme />
          </div>
        </Suspense>
      </RecoilRoot>
    </Router>
  )
}

export default AppRouter
