const express = require("express");
const bodyParser = require('body-parser')
const usersRepo = require('./repositories/user')

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
  const { email, password, passwordConfirmation } = req.body;

  const exixtingUser = await usersRepo.getOneBy({ email });
  if (exixtingUser) {
    return res.send('Email already in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('Password must match')
  }
  

  res.send("Post recieved!");
});

app.listen(3000, () => {
  console.log("listening");
});
