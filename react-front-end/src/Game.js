import React, { Component } from 'react';
import './App.css';
import PlayerSpellList from "./PlayerSpellList.js";
import NotificationBar from "./NotificationBar.js";
import MyCharacter from './MyCharacter.js'
import OpponentCharacter from './OpponentCharacter.js';
import axios from 'axios';


let player1 = {
  name: 'Sebastian',
  character: 'Rubeus Hagrid',
  currentPosition: 1,
  spells: [
    {
      name: 'Confrigo',
      description: "fiery cast, inflicts 2 points of damage to opponent's shield",
      power: 2,
      cast_limit: 100
    },
    {
      name: 'Bombarda',
      description: "Deals 3 damage to opponent's shield",
      power: 3,
      cast_limit: 3
    }
  ],
  defence: 5
}

// let player2 = {
//   name: 'Kira',
//   character: 'Bellatrix Lestrange',
//   currentPosition: 3,
//   spells: [
//     {
//       name: 'Confrigo',
//       description: "fiery cast, inflicts 2 points of damage to opponent's shield",
//       power: 2,
//       cast_limit: 100
//     },
//     {
//       name: 'Alohomora',
//       description: 'Unlocks doors, questionable for use in battle.',
//       power: 0,
//       cast_limit: 100
//     }
//   ],
//   defence: 5
// }


class Game extends Component {
    constructor(props) {
      super(props)
      this.chooseSpell = this.chooseSpell.bind(this);
      this.state = {
        currentSpell: '',
        spells:
        [
          {
            id: 1,
            name: 'Expelliarmus',
            description: 'Blast your opponent',
            power: 5,
            limit: 3
          },
          {
            id: 2,
            name: 'avadakadabra',
            description: 'kills opponent',
            power: 10,
            limit: 1
          }
        ],
        notifications: ['New player has joined', 'Player 1, your turn!'],
        myCharacter: {name: 'Dumbledore', image: 'https://vignette.wikia.nocookie.net/harrypotter/images/2/2f/101-albus_dumbledore.gif/revision/latest/scale-to-width-down/180?cb=20120622181924', health: 10},
        opponentCharacter: {name: 'Ron', image:'https://vignette.wikia.nocookie.net/harrypotter/images/2/2f/101-albus_dumbledore.gif/revision/latest/scale-to-width-down/180?cb=20120622181924' }

      }
    }

    chooseSpell(spell){
      this.setState({currentSpell: spell})
    }

    fetchData = () => {
      axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data) // The entire response from the Rails API

        console.log(response.data.message) // Just the message
        this.setState({
          message: response.data.message
        });
      })
    }

    render() {
      const { spells, notifications, myCharacter, opponentCharacter, currentSpell } =  this.state
      return (
        <div className="App">
          <div className='infoBar'>
            < PlayerSpellList chooseSpell={this.chooseSpell} userSpells={spells}/>
            < NotificationBar notifications={notifications} />
          </div>

          <div className='characterSection'>
            < OpponentCharacter characterInfo={opponentCharacter} />
            < MyCharacter characterInfo={myCharacter} />
          </div>

          <button className='castSpellBtn' onClick={() => this.setState({notifications: notifications.concat(`Player 1 used ${currentSpell}`)})}>
              Cast Spell
          </button>

          <div>
            <h1>{ this.state.message }</h1>
            <button onClick={this.fetchData} >
              Fetch Data
            </button>
          </div>
        </div>

      );
    }
  }

  export default Game;

