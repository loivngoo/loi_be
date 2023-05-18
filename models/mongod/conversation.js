import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },

        user: {
            type: String,
        },

        service: {
            type: String,
            enum: ['topup', 'withdraw', 'shopping'],
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;
