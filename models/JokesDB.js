const db = require('../db');

class JokesDB {
  // helper - splits jokeList into existing jokes and new jokes
  static async separateJokes(apiJokeList) {
    try {
      // split jokes between new and existing
      const newJokes = [];
      const existingJokes = [];
      for (let jokeObj of apiJokeList) {
        // check if joke is in database
        const isJokeExisting = await JokesDB.isJokeInDatabase(jokeObj.id);
        // if not, then add to newJokes
        if (isJokeExisting) existingJokes.push(jokeObj);
        else newJokes.push(jokeObj);
      }
      return { newJokes, existingJokes };
    } catch (err) {
      console.log(err);
      console.error('separateJokes was unable to complete successfully');
      throw new Error('Cannot add information to database');
    }
  }

  // takes list of jokes and adds only new jokes to database
  static async addJokesToDatabase(apiJokeList) {
    try {
      const { newJokes, existingJokes } = await JokesDB.separateJokes(
        apiJokeList
      );

      // gets exisiting JokeData
      const existingJokesWithVotes = [];
      for (let jokeObj of existingJokes) {
        const jokeData = await JokesDB.getJokeData(jokeObj.id);
        existingJokesWithVotes.push(jokeData);
      }

      // makes sure there are new jokes to add, else return o
      if (newJokes.length > 0) {
        // adds new JokeData
        // create insert substring and protected values for multi-row insert
        const newJokeDataList = newJokes.reduce(
          (acc, jokeObj) => {
            acc.jokeRowsData.push(jokeObj.id, jokeObj.joke, 0);
            acc.valuesArray.push(
              `($${++acc.count}, $${++acc.count}, $${++acc.count})`
            );
            return acc;
          },
          { valuesArray: [], jokeRowsData: [], count: 0 }
        );

        const newJokesWithVotes = await db.query(
          `INSERT INTO jokes (id, joketext, votes) VALUES ${newJokeDataList.valuesArray.join(
            ','
          )} RETURNING *`,
          newJokeDataList.jokeRowsData
        );

        // returned combined data of existing jokes and newly added jokes
        return [...existingJokesWithVotes, ...newJokesWithVotes.rows];
      }

      return existingJokesWithVotes;
    } catch (err) {
      console.log(err);
      console.error('addJokesToDatabase was unable to complete successfully');
      throw new Error('Cannot add information to database');
    }
  }

  // gets joke data for specific jokeId in the database
  static async getJokeData(jokeId) {
    try {
      const result = await db.query(`SELECT * FROM jokes WHERE id = $1`, [
        jokeId
      ]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
      console.error('getJokeData was unable to complete successfully');
      throw new Error('Cannot retrieve information from database');
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
      console.error('decreaseJokeVote was unable to complete successfully');
      throw new Error('Cannot retrieve information from database');
    }
  }
}

module.exports = JokesDB;
