import mongoose from 'mongoose';

const SupportSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            trim: true,
            enum: ['pending', 'processing', 'done'],
            default: 'pending',
        },
        service: {
            type: String,
            trim: true,
        },
        user: {
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

const Support = mongoose.model('Support', SupportSchema);

export default Support;
