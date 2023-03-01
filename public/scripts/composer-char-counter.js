$(document).ready(() => {
  // Find the textarea element inside the form in the new-tweet section
  const $tweetTextArea = $('.new-tweet form textarea');
  
  // Find the counter element
  const $counter = $('.new-tweet form .counter');
  
  // Register an event handler for the input event on the textarea element
  $tweetTextArea.on('input', () => {
    // Get the length of the text in the textarea
    const textLength = $tweetTextArea.val().length;
    
    // Update the counter with the remaining characters
    const remainingChars = 140 - textLength;
    $counter.text(remainingChars);
    
    // Check if the remaining characters is less than zero
    if (remainingChars < 0) {
      $counter.addClass('invalid');
    } else {
      $counter.removeClass('invalid');
    }
  });
});