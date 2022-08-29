const { triggerAsyncId } = require('async_hooks');
const { json } = require('body-parser');
const { Thoughts, User } = require('../models');

//get (find) all users
const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select('-_v')
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // get single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-_v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //create a new User// does this qualify as posting??
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    },
    //update user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete user by removing it's ID
    deleteUser({ params }, res) { //why is 'body' not included in these params?
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({message: 'No user found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));

        }
    }

module.exports = userController;
