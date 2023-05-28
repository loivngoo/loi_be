import Support from '../../models/mongod/support';
import Conversation from '../../models/mongod/conversation';
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export default async function CreateSupport(req, res) {
    try {
        const { service, user } = req.body;

        console.log("virtual user or real:", user);
        if (!service || !user) {
            return res.status(200).json({
                status_code: 88,
                message: 'Missing required fields.',
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
