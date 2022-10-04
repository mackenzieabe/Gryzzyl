// const { triggerAsyncId } = require('async_hooks');
// const { json } = require('body-parser');
// const { application } = require('express');
const { Thoughts, User } = require('../models');

//get (find) all users
const userController = {
    getUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // get single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
        .populate({
            path: 'friends',
            select: '-_v'
        })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //POST new user
    createUser({ body }, res) {
        User.create(body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //update user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },
    


    // remove friend from user's friend list
    removeFriend({ params }, res) {
        User.findOneAndDelete(
            { _id: params.userId },
            { $pull: { friend: { friendId: params.friendId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
}

module.exports = userController;
