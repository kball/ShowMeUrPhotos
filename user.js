if (typeof (App) === 'undefined') {App = {};}

if (typeof (App.Models) === 'undefined') {App.Models = {};}

App.Models.User = function(name, id, photo) {
  this.name = name;
  this.id = id;
  this.photo = photo;
  this.tweets = {};
  this.tweetCount = 0;
  this.references = {};
  this.referenceCount = 0;
  this.links = [];

};

App.Models.User.prototype.addTweet = function(tweet) {
  if (!this.tweets[tweet.id]) {
    this.tweets[tweet.id] = tweet;
    this.tweetCount = this.tweetCount + 1;
  }
}

App.Models.User.prototype.addReference = function(tweet) {
  if (!this.references[tweet.id]) {
    this.references[tweet.id] = tweet;
    this.referenceCount = this.referenceCount + 1;
  }
};
