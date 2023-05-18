import Support from '../../models/mongod/support';
import Message from '../../models/mongod/message';
export default async function (req, res) {
    try {
        const { supportId, conversation_id } = req.body;
        if (supportId) {
            const support = await Support.findOne({ _id: supportId }).populate('conversation_id').lean();
            if (!support) {
                return res.status(200).json({
                    status_code: 88,
                    message: 'Support not found.',
                });
            }

            const messages = await Message.find({ conversation_id: support.conversation_id._id })
                .sort({ created_at: -1 })
                .lean();

            res.status(200).json({
                status_code: 200,
                message: 'Get messages successfully.',
                data: messages,
            });
        } else {
            if (conversation_id) {
                console.log('Vaod day');
                const messages = await Message.find({ conversation_id: conversation_id })
                    .sort({ created_at: -1 })
                    .lean();
                res.status(200).json({
                    status_code: 200,
                    message: 'Get messages successfully.',
                    data: messages,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            error_code: 500,
            error_message: 'Server Internal Error',
            message: 'Server Internal Error',
        });
    }
}
