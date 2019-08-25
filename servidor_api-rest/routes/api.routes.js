let express = require('express');

const usuarioRoutes = require('./usuario.routes');
const loginRoutes = require('./login.routes');


let app = express();

app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);

module.exports = app;