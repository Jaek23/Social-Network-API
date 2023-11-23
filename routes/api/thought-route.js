const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
} = require('../../controllers/thought-controller');

// /api/thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought);

module.exports = router;
