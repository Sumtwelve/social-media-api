const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// api/thoughts/
router.route('/')
    .get(getAllThoughts)
    .post(addThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// Note there's no need for a function to get all reactions
// for one thought. When you get one thought, it comes with
// all of its reactions already.

// api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions')
    .post(addReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;