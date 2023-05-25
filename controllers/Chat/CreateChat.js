import Message from '../../models/mongod/message';
import { User } from '../../models';

export default async function (req, res) {
    try {
        const { content, image, user, conversation_id, support_id } = req.body;
        const phone = req.phone;
        if (!content && !image) {
            return res.status(200).json({
                message: 'Missing required fields.',
                status_code: 88,
            });
        }
        let sender = '';

        if (!phone) {
            sender = user;
        } else {
            const userInfo = await User.findOne({
                where: {
                    phone: phone,
                },
                attributes: ['phone', 'money', 'username', 'role', 'ip_address', 'status', 'createdAt'],
                raw: true,
            });
            if (userInfo) {
                sender = userInfo.phone;
            }
        }

        const newMessage = new Message({
            sender: sender,
            content,
            image,
            conversation_id,
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
