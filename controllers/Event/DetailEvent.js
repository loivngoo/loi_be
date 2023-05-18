import Event from '../../models/mongod/event';

export default async function (req, res) {
    try {
        const { user } = req.body;

        const userHasEvent = await Event.findOne({ user });
        if (!userHasEvent) {
            return res.status(200).json({
                status_code: 404,
                message: 'User not found.',
            });
        }
        res.status(200).json({
            status_code: 200,
            message: 'Create event successfully.',
            data: userHasEvent,
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
    }
}
