const bodyParser = require('body-parser');
const express = require('express');

const { widgets } = require('./widgets');

// Create the server
const app = express();

// Configure the server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.post('/', (req, res) => {

    const { pageId, slotId } = req.body;

    res.json({
        pageId,
        slotId,
        widget: widgets[pageId][slotId]
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and running on port: ${port}`);
});

