// npm modules
const express = require('express');
const router = new express.Router();

// class models
const APIError = require('../models/ApiError');

const Jokes = require('../models/Jokes');

/** Base Route: /jokes */

/** GET - /jokes
 * desc: get jokes - random, top (most popular), bottom (least popular)
 * @param {string} type - specifies what type of jokes list to return
 */
router.get('/', async (req, res, next) => {
  const { type } = req.query;

  try {
    let apiResult;
    if (type === 'top') {
      apiResult = await Jokes.getTopJokes();
    } else if (type === 'bottom') {
      apiResult = await Jokes.getWorstJokes();
    } else {
      apiResult = await Jokes.getRandomJokes();
    }
    return res.json(apiResult);
  } catch (err) {
    console.error(err);
    const error = new APIError('Could not retrieve jokes!', 400);
    return next(error);
  }
});

/** PATCH - /jokes/:jokeid/upvote
 * desc: adds one vote to specific joke
 */
router.patch('/:jokeId/upvote', async (req, res, next) => {
  try {
    const apiResult = await Jokes.upVote(req.params.jokeId);
    return res.json(apiResult);
  } catch (err) {
    console.error(err);
    const error = new APIError('Could not retrieve jokeId data', 400);
    return next(error);
  }
});

module.exports = router;

/** PATCH - /jokes/:jokeid/downvote
 * desc: deletes one vote from specific joke
 */
router.patch('/:jokeId/downvote', async (req, res, next) => {
  try {
    const apiResult = await Jokes.downVote(req.params.jokeId);
    return res.json(apiResult);
  } catch (err) {
    console.error(err);
    const error = new APIError('Could not retrieve jokeId data', 400);
    return next(error);
  }
});
