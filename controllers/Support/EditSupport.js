import Support from '../../models/mongod/support';
export default async function EditSupport(req, res) {
    try {
        const { status, support_id } = req.body;
        if (!status || !support_id) {
            return res.status(200).json({
                status_code: 88,
                message: 'Missing required fields.',
            });
        }

        const hasSupport = await Support.findOne({ _id: support_id });
        if (!hasSupport) {
            return res.status(200).json({
                status_code: 88,
                message: 'Support not found.',
            });
        }

        await Support.findOneAndUpdate(
            {
                _id: support_id,
            },
            {
                $set: {
                    status,
                },
            },
            {
                new: true,
            },
        );

        res.status(200).json({
            status_code: 200,
            message: 'Update support successfully.',
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
    }
}
