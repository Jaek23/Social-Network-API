const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
} = require('../../controllers/user-controller');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser);

module.exports = router;
