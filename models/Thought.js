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
            required: true,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

function formatDate(date) {
    if (date) return dayjs(date).format("dddd, MMM D, YYYY, h:mm A");
}

// Get the number of Reactions on each Thought. Used for get routes.
// Note that this virtual will only run on the route `/api/thoughts/`.
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;