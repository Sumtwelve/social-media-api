const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    getUserThoughts,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// api/users/
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// api/users/:userId
router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// api/users/:userId/thoughts
router.route('/:userId/thoughts')
    .get(getUserThoughts);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;