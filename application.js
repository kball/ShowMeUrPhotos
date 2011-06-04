//Lets put JS code here!
//
if (typeof (App) === 'undefined') {App = {};}

App.TwitterSearch = (function() {

  var tweeterTemplate;
  var users = {};

  var setup = function() {
    tweeterTemplate = Handlebars.compile($('#tweeter-template').html());
    $('#hashtag_button').click(function() {
      var term = $('#hashtag').val();
      search(term);
    });
  };

  var search = function(term) {
    $.ajax({dataType: "jsonp", url: 'http://search.twitter.com/search.json?q=%23' + term,
            success: showTweets });
  };

  var showTweets = function(data) {
    updateUsers(data);
    $('#tweeters').html('');
    $.each(sortedUsers(), function(i, user) {
      var tweeterId = '#tweeter_' + user.id;
      if(!$(tweeterId)[0]) {
        $('#tweeters').append("<li class='tweeter clearfix' id='tweeter_" + user.id + "'></li>");
      }
      $(tweeterId).html(tweeterTemplate(user));
    });
  };

  var updateUsers = function(data) {
    $.each(data.results, function(i, tweetData) {

      if(!users[tweetData.from_user]) {
        users[tweetData.from_user] = new App.Models.User(tweetData.from_user,
          tweetData.from_user_id, tweetData.profile_image_url);
      }
      var user = users[tweetData.from_user];
      user.addTweet(tweetData);
      var referencedUserNames = getReferences(tweetData.text);
    });
  };

  var sortedUsers = function() {
    var results = _.sortBy(users, function(user) {
      return user.tweetCount + user.referenceCount;
    }).reverse();
    return results;
  };

  var getReferences = function(text) {
    var userNames = []; // Fill me out with an array
    return userNames;
  };

  var getLinks = function(text) {
    var links = []; // Fill me out with an array
    return links;
  };


  return {setup: setup, users: users, search: search, showTweets: showTweets, sortedUsers : sortedUsers };
})();

$(document).ready(App.TwitterSearch.setup);
