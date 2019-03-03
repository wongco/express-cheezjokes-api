const { JOKES_API, JOKES_TOTAL_PAGES } = require('../config');
const JokesDB = require('./JokesDB');
const axios = require('axios');

class Jokes {
  static async getRandomJokes() {
    // get random pages of 20 jokes, starting at page #1 up to and inclusive of JOKES_TOTAL_PAGES
    const page = Math.floor(Math.random() * JOKES_TOTAL_PAGES) + 1;

    try {
      const apiResult = await axios.get(`${JOKES_API}/search`, {
        headers: {
          Accept: 'application/json'
        },
        params: {
          page
        }
      });

      await JokesDB.addJokesToDatabase(apiResult.data.results);

      return apiResult.data.results;
    } catch (err) {
      console.error('getRandomJokes was unable to complete successfully');
      const error = new Error('Issue getting data from Jokes API');
      throw error;
    }
  }

  static async getTopJokes() {
    try {
      return await JokesDB.getPopularJokes();
    } catch (err) {
      console.error('getTopJokes was unable to complete successfully');
      const error = new Error('Issue getting data from Jokes API');
      throw error;
    }
  }

  static async getWorstJokes() {
    try {
      return await JokesDB.getLeastPopularJokes();
    } catch (err) {
      console.error('getWorstJokes was unable to complete successfully');
      const error = new Error('Issue getting data from Jokes API');
      throw error;
    }
  }

  static async upVote(jokeId) {
    try {
      return await JokesDB.increaseJokeVote(jokeId);
    } catch (err) {
      console.error('upVote was unable to complete successfully');
      const error = new Error('Issue getting data from Jokes API');
      throw error;
    }
  }

  static async downVote(jokeId) {
    try {
      return await JokesDB.decreaseJokeVote(jokeId);
    } catch (err) {
      console.error('downVote was unable to complete successfully');
      const error = new Error('Issue getting data from Jokes API');
      throw error;
    }
  }
}

module.exports = Jokes;
