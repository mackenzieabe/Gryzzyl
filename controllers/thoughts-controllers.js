const { Thoughts, User } = require('../models');

//get all thoughts
const thoughtsController = {
    getThoughts(req, res) {
        Thoughts.find({})
            .select('-_v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                res.sendStatus(400);
            });
    },

    getSingleThought(req, res) {
        Thoughts.findOne({ _id: params.userId })
            .select('-_v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },

    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { reaction: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    createThought({ body }, res) {
        Thoughts.create(body)
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.json(err))
    },
    //not sure about this----(don't forget to push the created thought's _id to the associated user's thoughts array field)


    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $set: req.body },
            { new: true, runValidators: true })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(400).json({ message: 'No thought found with this ID!' })
                    : Thoughts.deleteMany({ _id: { $in: user } })
            )

            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    removeReaction({ params }, res) {
        Thoughts.findOneAndDelete(
            {_id: params.thoughtsId },
            { $pull: {replies: {replyId: params.replyId }}},
            { new: true }
        )
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch (err => res.json(err));
    }
};

module.exports= thoughtsController;