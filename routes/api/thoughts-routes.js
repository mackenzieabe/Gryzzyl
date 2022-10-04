const router = require ('express').Router();

const {
    getThoughts,
    getThoughtById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controllers') 

router.route('/').get(getThoughts).post(createThoughts)

router.route('/:id').get(getThoughtById).put(updateThoughts).delete(deleteThoughts)

router.route('/:thoughtsId/reaction').post(createReaction)

router.route('/:thoughtsId/reaction/:reactionId').delete(deleteReaction)

module.exports = router;

