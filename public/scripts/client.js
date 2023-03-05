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
  const $flagIcon = $('<i>').addClass('fas fa-flag');
  const $retweetIcon = $('<i>').addClass('fas fa-retweet');
  const $likeIcon = $('<i>').addClass('fas fa-heart');

  $header.append($avatar).append($name).append($handle);
  $body.append($text);
  $footer.append($timestamp).append($flagIcon).append($retweetIcon).append($likeIcon);
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
  // Get the error element and hide it
  const $error = $('#error').hide();

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
      // hide the error message if it is currently visible
      $error.slideUp();
    })
    .catch(function(error) {
      // handle error response from server
      console.log(error);
      // get the error message from the server response
      const errorMessage = error.responseJSON.error;
      // set the text of the error element to the error message and show it
      $error.text(errorMessage).slideDown();
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
        // Sort the tweets by their creation time in descending order
        data.sort((a, b) => new Date(b.created_at - new Date(a.created_at)));
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
