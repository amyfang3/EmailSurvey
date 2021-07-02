const express = require('express');

// vast majority of projects will only have one express app, but you could have multiple
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'buddy' });
});

// the port that Heroku tells app to listen to, using environment variables (production) or 5000 (development)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
