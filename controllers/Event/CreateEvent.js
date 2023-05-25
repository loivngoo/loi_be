import Event from '../../models/mongod/event';

export default async function (req, res) {
    try {
        const { user, service, percent, timedown } = req.body;

        const userHasEvent = await Event.findOne({ user });
        if (userHasEvent) {
            await Event.updateOne({ user }, { $set: { service, percent, timedown } });
        } else {
            await Event.create({ user, service, percent, timedown });
        }

        res.status(200).json({
            status_code: 200,
            message: 'Create event successfully.',
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
    }
}
