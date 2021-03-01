/* eslint-env browser */
// main.js
const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

update.addEventListener("click", (_) => {
  fetch("/events", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      day: "Darth Vadar",
      month: "I find your lack of faith disturbing.",
      year: " ... ",
      time: "...",
      address: "...",
      description: "..."
    })
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});

deleteButton.addEventListener("click", (_) => {
  fetch("/events", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar"
    })
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No event to delete") {
        messageDiv.textContent = "No Darth Vadar quote to delete";
      } else {
        window.location.reload(true);
      }
    })
    .catch(console.error);
});
