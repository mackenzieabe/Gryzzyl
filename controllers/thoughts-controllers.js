const { Thoughts, User } = require('../models');

//get all thoughts
const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .select('-_v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                res.sendStatus(400);
            });
    },

    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .select('-_v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this ID!' });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                res.status(400).json(err)
            });
    }
 
}