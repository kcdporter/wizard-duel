import React, { Component } from 'react';
import './styles/App.css';
import PlayerSpellList from "./PlayerSpellList.js";
import NotificationBar from "./NotificationBar.js";
import MyCharacter from './MyCharacter.js'
import OpponentCharacter from './OpponentCharacter.js';

class Game extends Component {
    render() {
      // console.log('current state', this.props.state)
      const { spells, notifications, myCharacter, opponentCharacter } =  this.props.state
      return (
        <div className="App">
          <div className='top'>
            <div className='characterSection'>
              <div className='chocolateFrog'>
                < MyCharacter characterInfo={myCharacter} />
              </div>
              <div className='animation'>
                <p>l;ashjflaskhjlf anwiehtiaowmhslfkhaml sdfkhlkas jdhflasdfl kajshdfml ajvsfldams dfasdkjfhalm skjfhdlashfln ksjdaflkjshdflm asndfyaiuwsdm flasfkadnasdfyiluamwdfkaslarewofilshdljhayslefiudkhjpawieusldhjflawieusydfhjablepsiugdlfjkhlawiusdhfjaliwseuhdflaisudhjflkajcsehrafilucjnsdkfhjalsiu</p>
                < spellAnimation />
              </div>
              <div className='chocolateFrog'>
                < OpponentCharacter characterInfo={opponentCharacter} />
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className='game-notifications'>
              < NotificationBar className='game-notifications' notifications={notifications} />
            </div>
            <div className='spell-selection-game'>
              < PlayerSpellList chooseSpell={this.props.chooseSpell} userSpells={this.props.state.mySpells}/>
            </div>
          </div>

          <button className='castSpellBtn' onClick={() => this.props.newNotification()}>
              Cast Spell
          </button>
        </div>

        /* <div>
              <h1>{ this.props.state.message }</h1>
              <button onClick={this.fetchData}>Fetch Data</button>
            </div> */

      );
    }
  }

  export default Game;

