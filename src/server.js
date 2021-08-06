const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const { widgets } = require('./widgets');

// Create the server
const app = express();

// Configure the server
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.post('/', (req, res) => {

    const { pageId, slotId } = req.body;
    const response = widgets[pageId][slotId];

    console.debug(`Request: {pageId: ${pageId}, slotId: ${slotId}}`);
    console.debug(`Response: ${JSON.stringify(response)}`);

    res.json({
        pageId,
        slotId,
        widget: response
    });
});

module.exports = app;
