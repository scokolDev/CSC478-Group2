// Import necessary modules
const express = require('express');

// Create a router instance
const router = express.Router();

// Placeholder for storing events
let events = [];

// Define controller functions
router.get('/', (req, res) => {
    res.json(events);
  });

router.post('/', (req, res) => {
    const {name, dateTime} = req.body;
    const newEvent = { id: events.length + 1, name, dateTime };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Export the router
module.exports = router;
