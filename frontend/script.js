document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.getElementById("dropdownBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", function () {
    dropdownMenu.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const newsMessage = document.getElementById("newsMessage");

  const messages = [
    "Enter the Video Hearing by your Face ID",
    "Find and approach best lawyers",
    "New version 1.1 will be launched soon"
  ];

  let index = 0;

  function showMessage(text) {
    newsMessage.textContent = text;
    newsMessage.classList.add("show");
  }

  function hideMessage() {
    newsMessage.classList.remove("show");
    newsMessage.classList.add("hide");
  }

  function cycleMessages() {
    hideMessage();

    setTimeout(() => {
      index = (index + 1) % messages.length;
      newsMessage.classList.remove("hide");
      showMessage(messages[index]);
    }, 600); // transition ke baad next message load
  }

  // Initial message
  showMessage(messages[index]);

  // Every 4 seconds change
  setInterval(cycleMessages, 4000);
});
