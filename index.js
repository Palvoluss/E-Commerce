const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button> Sing Up </button>
        </form>
    </div>
    `);
});


app.post("/", (req, res) => {
    console.log(req.body)
  res.send("Post recieved!");
});

app.listen(3000, () => {
  console.log("listening");
});
