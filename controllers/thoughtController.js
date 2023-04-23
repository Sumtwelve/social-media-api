const { User, Thought, Reaction } = require('../models');

module.exports = {
    // api/thoughts/
    // GET all Thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            if (!thoughts) {
                return res.status(404).json({ message: "No thoughts in the database :(" });
            }
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId
    // GET one Thought by its _id
    async getOneThought(req, res) {
        try {
            const thought = await Thought.find({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: "No thoughts found with that ID" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // api/thoughts/
    // POST route to create new Thought and push it to associated User
    async addThought(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // api/thoughts/
    // PUT route to update a Thought by its _id
    async updateThought(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // api/thoughts/
    // DELETE a Thought by its _id
    async deleteThought(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId/reactions
    // GET all Reactions for one Thought
    async getAllReactions(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId/reactions
    // POST route to create a Reaction and push it to the associated Thought
    async addReaction(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId/reactions
    // DELETE a Reaction from a Thought
    async getAllThoughts(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    }
}