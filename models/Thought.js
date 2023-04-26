const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// dayjs imports because I prefer dayjs to Date
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Minimum 1 character required to save a thought'],
            max: [280, '280 character limit exceeded']
        },
        createdAt: {
            type: Date,
            default: () => dayjs().toDate(),
            get: (date) => {
                if (date) return dayjs(date).format("dddd, MMM D, YYYY, h:mm A");
                // example return: `Friday, Apr 21, 2023, 3:22 PM`
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Get the number of Reactions on each Thought. Used for get routes.
// Note that this virtual will only run on the route `/api/thoughts/`.
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;