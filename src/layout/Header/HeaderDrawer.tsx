// src/layout/Header/HeaderDrawer.tsx

import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'

export default class HeaderDrawer extends React.PureComponent<IHDProps, IHDState> {
  constructor(props: IHDProps) {
    super(props)
    this.state = {
      toggleMenuFlag: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleListItemClick = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        toggleMenuFlag: false,
      }
    })
  }

  handleToggle() {
    this.setState((prevState) => {
      const newState = !prevState.toggleMenuFlag
      return {
        ...prevState,
        toggleMenuFlag: newState,
      }
    })
  }

  render() {
    return (
      <>
        <IconButton style={{ color: 'white' }} onClick={this.handleToggle}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer anchor="left" open={this.state.toggleMenuFlag} onClose={this.handleToggle}>
          <div style={{ backgroundColor: 'rgb(11, 13, 17)', height: '100%' }}>
            <Divider />
            <List>
              {[
                { name: 'Home', url: '/home' },
                { name: 'About', url: '/about' },
                { name: 'Contact', url: '/contact' },
                { name: 'privacy', url: '/privacy' },
              ].map((itemObject) => (
                <NavLink to={itemObject.url} className="NavLinkItem" key={itemObject.url} activeClassName="NavLinkItem-selected">
                  <ListItem button key={itemObject.name} onClick={this.handleListItemClick}>
                    <ListItemText primary={itemObject.name} />
                  </ListItem>
                </NavLink>
              ))}
            </List>
            <Divider />
          </div>
        </Drawer>
      </>
    )
  }
}

interface IHDProps {}

interface IHDState {
  toggleMenuFlag: boolean
}
