const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
}
)

const ThoughtsSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true, 
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Data.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true
    }
} 
);

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reaction.length
});

module.exports = Library;