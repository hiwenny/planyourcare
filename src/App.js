import React, { Component } from 'react'
import Header from './components/Header'
import HereMap from './components/Map'
import Sidebar from './components/Sidebar'
import './scss/index.scss'

export default class App extends Component {

  render() {
    return (
      <div className='container'>
        <Header />
        <main className='content'>
          <Sidebar />
          <HereMap />
        </main>
      </div>
    )
  }
}