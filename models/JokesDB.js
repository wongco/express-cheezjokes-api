const db = require('../db');

class JokesDB {
  // takes list of jokes and adds only new jokes to database
  static async addJokesToDatabase(apiJokeList) {
    try {
      // filter only jokes not found in database
      const newJokes = [];
      for (let jokeObj of apiJokeList) {
        // check if joke is in database
        const isJokeExisting = await JokesDB.isJokeInDatabase(jokeObj.id);
        // if not, then add to newJokes
        if (isJokeExisting === false) newJokes.push(jokeObj);
      }

      // create insert substring and protected values for multi-row insert
      let count = 0;
      const valuesArray = [];
      const jokeRowsData = newJokes.reduce((acc, jokeObj) => {
        acc.push(jokeObj.id, jokeObj.joke, 0);
        valuesArray.push(`($${++count}, $${++count}, $${++count})`);
        return acc;
      }, []);

      await db.query(
        `INSERT INTO jokes (id, joketext, votes) VALUES ${valuesArray.join(
          ','
        )} RETURNING *`,
        jokeRowsData
      );
    } catch (err) {
      console.error('addJokesToDatabase was unable to complete successfully');
      throw new Error('Cannot add information to database');
    }
  }

  // checks if a specific jokeId exists in the database
  static async isJokeInDatabase(jokeId) {
    try {
      const result = await db.query(`SELECT * FROM jokes WHERE id = $1`, [
        jokeId
      ]);
      return result.rows.length === 1;
    } catch (err) {
      console.error('isJokeInDatabase was unable to complete successfully');
      throw new Error('Cannot retrieve information from database');
    }
  }

  // gets list of 5 most popular jokes in database
  static async getPopularJokes() {
    try {
      const result = await db.query(
        'SELECT * FROM jokes ORDER BY votes DESC LIMIT 5'
      );
      return result.rows;
    } catch (err) {
      console.error('getPopularJokes was unable to complete successfully');
      throw new Error('Cannot retrieve information from database');
    }
  }

  // gets list of 5 least popular jokes in database
  static async getLeastPopularJokes() {
    try {
      const result = await db.query(
        'SELECT * FROM jokes ORDER BY votes ASC LIMIT 5'
      );
      return result.rows;
    } catch (err) {
      console.error('getLeastPopularJokes was unable to complete successfully');
      throw new Error('Cannot retrieve information from database');
    }
  }

  // increments vote count by 1 on specific jokeId in db
  static async increaseJokeVote(jokeId) {
    try {
      const result = await db.query(
        `UPDATE jokes SET votes = votes + 1 WHERE id = $1 RETURNING *`,
        [jokeId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('increaseJokeVote was unable to complete successfully');
      throw new Error('Cannot retrieve information from database');
    }
  }

  // decrements vote count by 1 on specific jokeId in db
  static async decreaseJokeVote(jokeId) {
    try {
      const result = await db.query(
        `UPDATE jokes SET votes = votes - 1 WHERE id = $1 RETURNING *`,
        [jokeId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('decreaseJokeVote was unable to complete successfully');
      throw new Error('Cannot retrieve information from database');
    }
  }
}

module.exports = JokesDB;
