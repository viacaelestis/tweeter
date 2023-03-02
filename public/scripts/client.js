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
    $('#tweets-container').append($tweet);
  }
}