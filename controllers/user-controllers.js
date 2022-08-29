const { triggerAsyncId } = require('async_hooks');
const { json } = require('body-parser');
const { application } = require('express');
const { Thoughts, User } = require('../models');

//get (find) all users
const userController = {
    getUsers(req, res) {
        User.find({})
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
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //update user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $set: req.body },
            { new: true, runValidators: true })
            .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(use)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    //delete user by removing it's ID
    deleteUser(req, res) { //why is 'body' not included in these params?
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(400).json({ message: 'No user found with this ID!' })
                    : User.deleteMany({ _id: { $in: user } })
            )

            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));

    },

    //not sure how to do this part:
    //POST to add a new friend to a user's friend list
    //DELETE to remove a friend from a user's friend list
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },//will this post a new friend to a user's friend list?
            { new: true, runValidators: true }
        )
            .then((User) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = userController;
