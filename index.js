$(document).ready(function () {
  setTimeout(function () {
    document.querySelector(".lds-ripple").style.display = "none";
    const contentElement = document.querySelector(".content");
    contentElement.style.opacity = "1";
  }, 1000);

  // Get the future date for countdown
  function calculateFutureDate() {
    var fixedDate = new Date();
    fixedDate.setDate(fixedDate.getDate() + 25); // Set to 25 days from now

    var dd = fixedDate.getDate();
    var mm = fixedDate.getMonth() + 1;
    var y = fixedDate.getFullYear();

    return `${mm}/${dd}/${y} 12:00:00`;
  }

  // Initialize countdown timer
  $(".countdown").downCount({
    date: calculateFutureDate(),
    offset: -4,
  });

  // Event handler for closing pop-up
  var $popClose = $(".close-btn");
  var $popOverlay = $(".popup-overlay");
  var $popWindow = $(".popWindow");
  var $subscribeWindow = $(".subscribe_window");
  var $popThankYouWindow = $(".thank_you_window");

  $popClose.on("click", function () {
    $popOverlay.fadeOut();
    $popWindow.fadeOut();
  });

  // Close Pop-Up after clicking on the Overlay
  $(document).on("click", function (event) {
    if ($(event.target).closest($popWindow).length) return;
    $popOverlay.fadeOut();
    $popWindow.fadeOut();
    event.stopPropagation();
  });

  // Form submission
  $(".subscribe-form").on("submit", function (event) {
    event.preventDefault();

    // Custom validation logic
    if (!customValidation()) {
      return;
    }

    console.log("sheet");
    let name = $('[name="name"]').val();
    let phone = $('[name="phone"]').val();

    // Perform asynchronous form submission
    fetch(
      `https://sheets-node-app.onrender.com/append?name=${name}&phone=${phone}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Check if the response contains an error message
        if (data && data.error) {
          // Show error message to the user
          $("#custom-error-message-phone").text(data.error);
        } else {
          // Show the "Thank you" message
          $subscribeWindow.fadeOut();
          $popOverlay.fadeIn();
          $popThankYouWindow.fadeIn();

          // Reload the page after 4.5 seconds
          setTimeout(() => {
            location.reload();
          }, 4500);
        }
      })
      .catch((error) => {
        // Handle 400 Bad Request error
        if (error.message.includes("400")) {
          $("#custom-error-message-phone").text(
            "This number is already subscribed."
          );
        } else {
          console.error("Error:", error);
        }
      });
  });

  // Show the form after a delay on page load
  $(window).on("load", function () {
    setTimeout(function () {
      $popOverlay.fadeIn();
      $subscribeWindow.fadeIn();
    }, 3000);
  });

  // Show the form when a button with class "subscribe-btn" is clicked
  $(".subscribe-btn").on("click", function () {
    setTimeout(function () {
      $popOverlay.fadeIn();
      $subscribeWindow.fadeIn();
    }, 1000);
  });

  // Custom validation function
  function customValidation() {
    var nameInput = $('[name="name"]').val();
    var phoneInput = $('[name="phone"]').val();
    var isValid = true;

    // Reset previous error messages
    $("#custom-error-message-name").text("");
    $("#custom-error-message-phone").text("");

    // Custom validation logic for name
    if (nameInput.trim().length < 3) {
      $("#custom-error-message-name").text(
        "Name should be at least 3 characters."
      );
      isValid = false;
    }

    // Custom validation logic for phone
    if (!/^(012|011|010|015)\d{8}$/.test(phoneInput.trim())) {
      $("#custom-error-message-phone").text(
        "Please enter a valid phone number starting with 012, 011, 010, or 015, followed by 8 digits."
      );
      isValid = false;
    }

    return isValid;
  }
});
