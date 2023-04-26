const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        // Fields `_id` and `id` are omitted from the schema,
        // and `reactionId` is used instead. I do not know why this was done,
        // but it seems the only effect this has is to effectively
        // "rename" the classic `_id` field to `reactionId` for this schema.
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionText: {
            type: String,
            required: true,
            max: [280, 'Maximum 280 character limit exceeded']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => dayjs().toDate(),
            get: (date) => {
                if (date) return dayjs(date).format("dddd, MMM D, YYYY, h:mm A");
                // example return: `Friday, Apr 21, 2023, 3:22 PM`
            }
        }
    },
    {
        // Omit these fields from the schema, use `reactionId` field instead.
        _id: false,
        id: false
    }
);

module.exports = reactionSchema;