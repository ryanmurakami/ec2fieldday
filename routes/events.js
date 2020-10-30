const eventsDTO = require('../model/event');
const {
    getInProgressEvent,
    getLastEvent,
    runInProgressEvent
} = require('../services/eventTracker');

//initialize
module.exports = function (router) {
    router.get('/events', getAllEvents);
    router.get('/events/:event_id', getEvents);
    router.post('/events', startEvent);
}

//APIs
async function getAllEvents(req, res) {
    const events = await eventsDTO.getEvents();
    const result = {
        "allEvents": events,
        "inProgress": getInProgressEvent(),
        "lastEvent": getLastEvent()
    }

    return res.status(200).json({
        body: result
    });
}

async function getEvents(req, res) {
    const events = await eventsDTO.getEvents();
    const event = events.find(e => e.id === req.params.event_id);

    if (event) {
        return res.status(200).json({
            body: event
        });
    } else {
        return res.status(404).json({
            message: 'Invalid event id'
        });
    }
    
}

function startEvent(req, res) {
    runInProgressEvent(req.body);

    return res.status(200).json({
        message: `${req.body.name} has started`
    });
}