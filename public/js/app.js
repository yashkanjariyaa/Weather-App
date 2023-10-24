console.log("Successfully launched client");

const weatherForm = document.querySelector("#myForm");
const search = document.querySelector("#locationInput");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  try {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch(`http://localhost:3000/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            messageThree.textContent = data.date;
          }
        });
      }
    );
  } catch (e) {
    console.log(e);
  }
});
