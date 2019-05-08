const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const knex = require('./knex/knex.js');
const randomId = function() { return Math.floor(Math.random() * 10000000) };

App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));


App.get('/api/wizards', (req, res) => {
  let response = function(characters) {
    let wizards = {wizards:characters}
    res.json({
      message:`Coming back from the server with the wizards ${wizards}`,
      wizards
    });
  }
  knex.select('*').from('characters')
  .then(characters => response(characters));
});

App.get('/api/spells', (req, res) => {
  let response = function(thespells) {
    let spells = {spells:thespells}
    res.json({
      message:`Coming back from the server with the spells ${spells}`,
      spells
    });
  }
  knex.select('*').from('spells')
  .then(thespells => response(thespells));
});

App.get('/api/users', (req, res) => {
  let response = function(users) {
    let usersFromDb = {users:users}
    res.json({
      message:`Coming back from the server with the users ${usersFromDb}`,
      usersFromDb
    });
  }
  knex.select('*').from('users')
  .then(users => response(users));
})

App.post('/api/newuser?', (req, res) => {
  knex('users').insert({ id: randomId(), username: req.query.username, email: `wizard@wizardduel.jams`, password: 123, experience_points: 100, wins: 0, losses: 0 })
  .then(console.log(`${req.query.username} added`));
})

App.post('/api/endgame?', (req, res) => {
  console.log(req.query.username);
  knex('users').where({ username: req.query.username }).update({ experience_points: (parseInt(req.query.experience, 10) + 100)})
  .then(console.log('db updated'));
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});