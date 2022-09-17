const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email)
}

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill in a valid email address'],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email adress']
    },
    thoughts:
        [{ type: Schema.Types.ObjectId, ref: 'thoughts' }],

    friends:
        [{ type: Schema.Types.ObjectId, ref: 'user' }],
},
    {
        toJSON: {
            virtuals: true
        },
    }

);

UserSchema.virtual('friendCount').get(function () {
    return this.friend.length
});

const User = model('User', UserSchema);
module.exports = User;