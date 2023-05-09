const express = require('express');
const app = express();
const pokemonRoutes = express.Router();

let Pokemon = require('../model/Pokemon');

// api to add pokemon
pokemonRoutes.route('/add').post(function (req, res) {
  let pokemon = new Pokemon(req.body);
  pokemon.save()
  .then(pokemon => {
    res.status(200).json({'status': 'success','mssg': 'pokemon added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get pokemons
pokemonRoutes.route('/').get(function (req, res) {
  Pokemon.find(function (err, pokemons){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','pokemons': pokemons});
    }
  });
});

// api to get pokemon
pokemonRoutes.route('/pokemon/:id').get(function (req, res) {
  let id = req.params.id;
  Pokemon.findById(id, function (err, pokemon){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','pokemon': pokemon});
    }
  });
});

// api to update route
pokemonRoutes.route('/update/:id').put(function (req, res) {
    Pokemon.findById(req.params.id, function(err, pokemon) {
    if (!pokemon){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        pokemon.name = req.body.name;
        pokemon.email = req.body.email;
        pokemon.phone_number = req.body.phone_number;

        pokemon.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
pokemonRoutes.route('/delete/:id').delete(function (req, res) {
  Pokemon.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = pokemonRoutes;