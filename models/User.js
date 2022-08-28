


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
        [this],
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
