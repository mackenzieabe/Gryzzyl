const { Thoughts, User } = require('../models');

//get all thoughts
const thoughtsController = {
    getThoughts(req, res) {
        Thoughts.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
    })
},
    //get single thought
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: ('-_v')
            })
            .select('-_v')
            .sort({ _id: -1 })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts found with that ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },

        createReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
        { _id: params.thoughtsId },
        { $push: { reactions: body } },
        { new: true,})// runValidators: true 
        .populate({ path: 'reactions', select: '-_v' })
        .select('-_v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
},


createThoughts(req, res) {
    Thoughts.create(req.body)
        .then((dbData) => {
            console.log(req.body.userId);
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbData._id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},


updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate(
        { _id: params.id },
        body,
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

deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'Nope!'});
          return;
        }
       res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;