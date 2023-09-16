console.log("Client Side JavaScript File is loaded!!");

const form = document.querySelector("form");
const search = document.querySelector("input");
const msg_1 = document.querySelector("#msg_1");
const msg_2 = document.querySelector("#msg_2");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  msg_1.textContent = "Loading...";
  msg_2.textContent = "";

  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg_1.textContent = data.error;
        } else {
          msg_1.textContent = data.location;
          msg_2.textContent = data.forecast;
        }
      });
    }
  );
});
