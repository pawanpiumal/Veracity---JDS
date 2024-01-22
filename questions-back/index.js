const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const data = require('./routes/api/data')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/data',data);

const port = 5000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
