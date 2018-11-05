const express = require('express');
const router = require('./router');

let app = express();
router(app);
// app.set('view engine', 'ejs');
app.listen(3002);