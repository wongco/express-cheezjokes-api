// npm modules
const express = require('express');
const router = new express.Router();

// class models
const Joke = require('../models/Joke');
const APIError = require('../models/ApiError');

/** Base Route: /jokes */

/** GET - /jokes
 * desc: get jokes
 */
router.get('/', async (req, res, next) => {
  // parameter to specific top jokes, bottom jokes, or random jokes
  return res.json({});
});

/** PATCH - /jokes/:jokeid/downvote
 * desc: deletes one vote from specific joke
 */
router.put('/:jokeid/downvote', async (req, res, next) => {
  return res.json({});
});

/** PATCH - /jokes/:jokeid/upvote
 * desc: adds one vote to specific joke
 */
router.put('/:jokeid/upvote', async (req, res, next) => {
  return res.json({});
});

module.exports = router;
