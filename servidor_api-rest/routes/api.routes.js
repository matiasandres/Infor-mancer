let express = require('express');

const usuarioRoutes = require('./usuario.routes');
const loginRoutes = require('./login.routes');
const ficharoutes = require('./ficha.routes');


let app = express();

app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/ficha', ficharoutes);

module.exports = app;