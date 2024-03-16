const {PORT, BASE_URL} = require("./helpers/config");

const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: BASE_URL,
    credentials: true
}));

app.use('/', routes); //to use the routes
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('helpers'));

const listener = app.listen(PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})