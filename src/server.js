const express = require('express');
const morgan = require('morgan');

const { trace } = require('@jahiduls/lib-tracing');

const { modules, widgets } = require('./config/widgets');

// Create the server
const app = express();

// Configure the server
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get('/widgets/:pageId/:slotId', (req, res) => {

    const { pageId, slotId } = req.params;
    const response = tracedFetchSlotContent(pageId, slotId);

    const resp = {
        pageId,
        slotId,
        widget: response
    };

    console.debug(`Request: {pageId: ${pageId}, slotId: ${slotId}}`);
    console.debug(`Response: ${JSON.stringify(resp)}`);

    res.json(resp);
});

app.get('/modules/:pageId', (req, res) => {

    const { pageId } = req.params;

    const resp = {
        modules: [modules.common]
    };

    console.debug(`Request: {pageId: ${pageId}}`);
    console.debug(`Response: ${JSON.stringify(resp)}`);

    res.json(resp);

});

const fetchSlotContent = (pageId, slotId) => widgets[pageId][slotId];
const tracedFetchSlotContent = trace(fetchSlotContent, 'fetch-slot-content');

module.exports = app;
