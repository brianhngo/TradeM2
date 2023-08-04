const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
 
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
