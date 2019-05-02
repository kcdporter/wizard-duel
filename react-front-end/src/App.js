import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './gameedit.js';
import Instructions from './Instructions';
import Navigation from './Navigation.js';
import Login from './Login.js';
import Setup from './Setup.js';
import SpellSetup from './SpellSetup';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mySpells: [],
      myPosition: 2,
      currentUser: '',
      currentSpell: '',
      spells: null,
      notifications: ['New player has joined', 'Player 1, your turn!'],
      myCharacter: null,
      opponentCharacter: null,
      wizards: null
    }
  }

  chooseSpell = (spell) => {
    this.setState({currentSpell: spell})
  }

  chooseWizard = (wizard) => {
    this.setState({myCharacter: wizard})
  }

  setPlayerOptions = (spells, position) => {
    this.setState({ mySpells: spells, myPosition: position })
  }

  newNotification = () => {
    this.setState({notifications: this.state.notifications.concat(`Player 1 used ${this.state.currentSpell}`)})
  }

  newUser = (user) => {
    this.fetchData()
    .then(([{ data: { wizards: { wizards } } }, { data: { spells: { spells } } }]) => {
      this.setState({
        wizards, spells, currentUser: user
      })
    }).catch(console.error)
  }

  fetchSpells() {
    return axios.get('/api/spells')
  }

  fetchWizards() {
    return axios.get('/api/wizards')
  }

  fetchData = () => {
    return Promise.all([this.fetchWizards(), this.fetchSpells()]);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path='/'render={(props) => <Login {...props} newUser={this.newUser} state={this.state} loadDb={this.fetchData}/>} />
          <Route path='/game'render={(props) => <Game {...props} chooseSpell={this.chooseSpell} newNotification={this.newNotification} state={this.state}/>}/>
          <Route path='/instructions' component={Instructions}/>
          <Route path='/setup'render={(props) => <Setup {...props} state={this.state} chooseWizard={this.chooseWizard}/>}/>
          <Route path='/spell_setup' render={(props) => <SpellSetup {...props} state={this.state} setPlayerOptions={this.setPlayerOptions}/>}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
