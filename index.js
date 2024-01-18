$(document).ready(function () {
  setTimeout(function () {
    document.querySelector(".lds-ripple").style.display = "none";
    const contentElement = document.querySelector(".content");
    contentElement.style.opacity = "1";
  }, 1000);
  // Get the date
  function calculateFutureDate() {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 20);

    var dd = currentDate.getDate();
    var mm = currentDate.getMonth() + 1;
    var y = currentDate.getFullYear();

    return mm + "/" + dd + "/" + y + " 12:00:00";
  }

  $(".countdown").downCount({
    date: calculateFutureDate(),
    offset: -4,
  });

  var $popClose = $(".close-btn");
  var $popOverlay = $(".popup-overlay");
  var $popWindow = $(".popWindow");
  var $subscribeWindow = $(".subscribe_window");
  var $popThankYouWindow = $(".thank_you_window");

  // Close Pop-Up after clicking on the button "Close"
  $popClose.on("click touchstart", function () {
    $popOverlay.fadeOut();
    $popWindow.fadeOut();
  });

  // Close Pop-Up after clicking on the Overlay
  $(document).on("click touchstart", function (event) {
    if ($(event.target).closest($popWindow).length) return;
    $popOverlay.fadeOut();
    $popWindow.fadeOut();
    event.stopPropagation();
  });

  // Form submission
  $(".subscribe-form").on("submit touchend", function (event) {
    event.preventDefault();

    console.log("sheet");
    let name = $('[name="name"]').val();
    let phone = $('[name="phone"]').val();
    fetch(`http://localhost:3000/append?name=${name}&phone=${phone}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Show the "Thank you" message
        $subscribeWindow.fadeOut();
        $popOverlay.fadeIn();
        $popThankYouWindow.fadeIn();

        setTimeout(() => {
          location.reload();
        }, 3500);
      })
      .catch((error) => console.error("Error:", error));
  });

  $(window).on("load", function () {
    setTimeout(function () {
      $popOverlay.fadeIn();
      $subscribeWindow.fadeIn();
    }, 3000);
  });
});
