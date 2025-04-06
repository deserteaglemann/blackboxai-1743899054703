require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../')));

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const REQUESTS_FILE = path.join(DATA_DIR, 'requests.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Initialize empty data files if they don't exist
if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(REQUESTS_FILE)) {
    fs.writeFileSync(REQUESTS_FILE, JSON.stringify([]));
}

// Helper functions for data operations
const readEvents = () => JSON.parse(fs.readFileSync(EVENTS_FILE));
const readRequests = () => JSON.parse(fs.readFileSync(REQUESTS_FILE));
const writeEvents = (data) => fs.writeFileSync(EVENTS_FILE, JSON.stringify(data, null, 2));
const writeRequests = (data) => fs.writeFileSync(REQUESTS_FILE, JSON.stringify(data, null, 2));

// API Routes

// Events Endpoints
app.get('/api/events', (req, res) => {
    try {
        const events = readEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.post('/api/events', (req, res) => {
    try {
        const events = readEvents();
        const newEvent = {
            id: Date.now().toString(),
            ...req.body,
            qrCode: `/event/${Date.now()}`,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        events.push(newEvent);
        writeEvents(events);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Requests Endpoints
app.get('/api/events/:eventId/requests', (req, res) => {
    try {
        const requests = readRequests();
        const eventRequests = requests.filter(r => r.eventId === req.params.eventId);
        res.json(eventRequests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

app.post('/api/requests', (req, res) => {
    try {
        const requests = readRequests();
        const newRequest = {
            id: Date.now().toString(),
            ...req.body,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        requests.push(newRequest);
        writeRequests(requests);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create request' });
    }
});

app.patch('/api/requests/:requestId', (req, res) => {
    try {
        const requests = readRequests();
        const index = requests.findIndex(r => r.id === req.params.requestId);
        if (index === -1) {
            return res.status(404).json({ error: 'Request not found' });
        }
        requests[index] = { ...requests[index], ...req.body };
        writeRequests(requests);
        res.json(requests[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`CLOD server running on port ${PORT}`);
    console.log(`API Documentation:`);
    console.log(`- GET    /api/events`);
    console.log(`- POST   /api/events`);
    console.log(`- GET    /api/events/:eventId/requests`);
    console.log(`- POST   /api/requests`);
    console.log(`- PATCH  /api/requests/:requestId`);
});