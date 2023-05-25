import Message from '../../models/mongod/message';
import { User } from '../../models';
import Support from '../../models/mongod/support';

export default async function (req, res) {
    try {
        const { content, image, user, support_id } = req.body;
        if (!content) {
            return res.status(200).json({
                message: 'Missing required fields.',
                status_code: 88,
            });
        }

        const support = await Support.findById(support_id);

        const newMessage = new Message({
            sender: `ADMIN - ${req.phone}`,
            content,
            image,
            conversation_id: support.conversation_id,
        });

        await newMessage.save();

        res.status(200).json({
            message: 'Sent',
            status_code: 200,
            data: newMessage,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            error_code: 500,
            error_message: 'Server Internal Error',
            message: 'Server Internal Error',
        });
    }
}
