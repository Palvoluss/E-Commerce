const express = require("express");
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/carts')

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['cookiesessionkey73924832347']
}))

app.use(authRouter)
app.use(adminProductsRouter)
app.use(productsRouter)
app.use(cartRouter)



app.listen(3000, () => {
  console.log("listening");
});
