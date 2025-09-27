const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

function daysToNextSaturday() {
  const today = new Date();
  const day = today.getDay(); // 0=Sunday ... 6=Saturday
  let diff = (6 - day + 7) % 7;
  if (diff === 0) diff = 7;
  return diff;
}

app.get("/", (req, res) => {
  res.send(`<h1>До суботи залишилось ${daysToNextSaturday()} днів</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});