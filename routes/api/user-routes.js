const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend 
} = require('../../controllers/user-controllers');

router
.route('/')
.get(getUsers)
.post(createUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);


router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);


module.exports = router; 