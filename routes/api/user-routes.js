const router = require('expres').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend  
} = require('../../controllers/user-controllers');

router
.route('/')
.get(getUsers)
.post(createUser);


router
.route('/:id')
.get(getSingleUser)
//createUser?
.put(updateUser)
.delete(deleteUser);


module.exports = router; 