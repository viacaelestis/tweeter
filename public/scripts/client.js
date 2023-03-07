/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const $tweet = $('<article>').addClass('tweet');
  const $header = $('<header>').addClass('tweet-header');
  const $avatar = $('<img>').attr('src', tweetData.user.avatars);
  const $name = $('<h2>').addClass('tweet-title').text(tweetData.user.name);
  const $handle = $('<p>').addClass('tweet-handle').text(tweetData.user.handle);
  const $body = $('<div>').addClass('tweet-body');
  const $text = $('<p>').text(tweetData.content.text);
  const $footer = $('<footer>').addClass('tweet-footer');
  const $timestamp = $('<p>').addClass('tweet-timestamp').text(timeago.format(tweetData.created_at));
  const $flagIcon = $('<i>').addClass('icon fas fa-flag');
  const $retweetIcon = $('<i>').addClass('icon fas fa-retweet');
  const $likeIcon = $('<i>').addClass('icon fas fa-heart');

  $header.append($avatar).append($name).append($handle);
  $body.append($text);
  $footer.append($timestamp).append($flagIcon).append($retweetIcon).append($likeIcon);
  $tweet.append($header).append($body).append($footer);

  return $tweet;
}

const renderTweets = (tweets) => {
  const $tweetList = $('#tweet-container');
  $tweetList.empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
}

// fetch tweets from /tweets page
const loadTweets = () => {
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


$(document).ready(() => {
  // Get the error element and hide it
  const $error = $('#error-message').hide();

  // Add event listener for form submission
  $('#tweet-form').submit(function(event) {
    // prevent default form submission behavior
    event.preventDefault();

    const tweetText = $('#tweet-text').val().trim(); // Remove leading/trailing whitespace

    // Check if tweet is empty or too long
    if (tweetText === "" || tweetText.length > 140) {
      $error.text("Invalid tweet. Please enter 1-140 characters.").slideDown(); // Display error message
    } else {
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
      
      // Clear textarea and reset character counter
      $('#tweet-text').val("");
      $('.counter').text("140");
    }
  });

  // Call loadTweets to load tweets on page load
  loadTweets();
});