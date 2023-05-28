import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    service: {
        type: Array,
        default: [],
    },
    percent: {
        type: Number,
        default: 0,
    },
    timedown: {
        type: String,
    },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
