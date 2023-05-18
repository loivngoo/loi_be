import Support from '../../models/mongod/support';
import Conversation from '../../models/mongod/conversation';
export default async function CreateSupport(req, res) {
    try {
        const { service, user } = req.body;
        if (!service || !user) {
            return res.status(200).json({
                status_code: 88,
                message: 'Missing required fields.',
            });
        }

        const hasSupport = await Support.findOne({ service, user });
        if (hasSupport) {
            return res.status(200).json({
                status_code: 99,
                message: 'You have already created a ticket for this service.',
                data: hasSupport.conversation_id,
            });
        }

        const newConversation = await Conversation.create({
            members: [user],
            service,
            user,
        });

        const support = await Support.create({
            service,
            user,
            conversation_id: newConversation._id,
        });

        res.status(200).json({
            status_code: 200,
            message: 'Create support successfully.',
            data: {
                ...support.toObject(),
                conversation_id: newConversation._id,
            },
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
    }
}
