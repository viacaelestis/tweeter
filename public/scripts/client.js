/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const $tweet = $('<article>').addClass('tweet');
  const $header = $('<header>');
  const $avatar = $('<img>').attr('src', tweetData.user.avatars);
  const $name = $('<h2>').addClass('tweet-title').text(tweetData.user.name);
  const $handle = $('<p>').addClass('tweet-handle').text(tweetData.user.handle);
  const $body = $('<div>').addClass('tweet-body');
  const $text = $('<p>').text(tweetData.content.text);
  const $footer = $('<footer>');
  const $timestamp = $('<p>').addClass('tweet-timestamp').text(timeago.format(tweetData.created_at));

  $header.append($avatar).append($name).append($handle);
  $body.append($text);
  $footer.append($timestamp);
  $tweet.append($header).append($body).append($footer);

  return $tweet;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
}

// Form submission using JQuery
$(document).ready(function() {
  // listen for form submit event
  $('#tweet-form').submit(function(event) {
    // prevent default form submission behavior
    event.preventDefault();
    
    // serialize form data
    const formData = $(this).serialize();
    
    // send data as POST request to server
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData
    })
    .then(function(response) {
      // handle successful response from server
      console.log(response);
      // load tweets again to update the page with the new tweet
      loadTweets();
    })
    .catch(function(error) {
      // handle error response from server
      console.log(error);
    });
  });
});

// fetch tweets from /tweets page
$(document).ready(function() {

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        // Render the tweets to the page
        renderTweets(data);
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  }

  // Call loadTweets to load tweets on page load
  loadTweets();

});

console.log("create tweet:", createTweetElement);
console.log("render tweet:", renderTweets);