/** Joke class */

class Joke {
  constructor({ id, jokeText }) {
    this.id = id;
    this.jokeText = jokeText;
    this.votes = 0;
  }

  upVote() {
    this.votes++;
  }

  downVote() {
    this.votes--;
  }
}

module.exports = Joke;
