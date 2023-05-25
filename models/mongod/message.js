import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
        },
        sender: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        conversation_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;
