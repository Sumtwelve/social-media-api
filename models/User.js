const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            max_length: 30,
            unique: true,
            trim: true   
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: (email) => {
                    // regex to detect valid email
                    // this regex has not been rigorously tested
                    return /^[\w.+-]+@[\w.+-]+\.[\w.-]+$/.test(email);
                }
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        // Below was added for the "get all users" route, which uses Mongoose's
        // `Schema.find()` method. For some reason, Mongoose wants to populate
        // an `_id` field *and* an `id` field in the JSON. The values of these two fields
        // were always identical in test runs. I've decided `id` is redundant.
        // `id: false` simply causes Mongoose to omit this field when running the get route.
        // That's all it appears to do at least. I don't know if anything deeper is going on.
        id: false
    }
);

// virtual to get the number of friends a User has
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;