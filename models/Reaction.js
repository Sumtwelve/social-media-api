const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
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
    }
);

module.exports = reactionSchema;