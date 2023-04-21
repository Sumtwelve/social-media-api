const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

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
                validator: function(v) {
                    return /^[\w.+-]+@[\w.+-]+\.[\w.-]+$/.test(v);
                }
            }
        },
        thoughts: [thoughtSchema],
        friends: [userSchema]
    }
)