const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

app.get('/', (req, res) => {
  res.redirect('/category');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
