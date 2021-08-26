const express = require("express");
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const usersRepo = require('./repositories/user')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['cookiesessionkey73924832347']
}))

app.get("/signup", (req, res) => {
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

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out')
})

app.get('/signin', (req, res) =>{
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button> Sing In </button>
        </form>
    </div>
    `)
})


app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const exixtingUser = await usersRepo.getOneBy({ email });
  if (exixtingUser) {
    return res.send('Email already in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('Password must match')
  }
  
  const user = await usersRepo.create({ email, password });
  req.session.userId = user.id;


  res.send("Post recieved!");
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body

  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send('Email not found');
  }

  const validPassword = await usersRepo.comparePassword(
    user.password,
    password
  )
  if (!validPassword) {
    return res.send('Invalid password')
  }
  req.session.userId = user.id

  res.send('You are logged in!')

})



app.listen(3000, () => {
  console.log("listening");
});
