const bodyParser = require('body-parser');
const express = require('express');

// Create the server
const app = express();

// Configure the server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.post('/', (req, res) => {
    res.json({
        pageId: req.body.pageId,
        slotId: req.body.slotId,
        widget: 'nav'
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and running on port: ${port}`);
});

