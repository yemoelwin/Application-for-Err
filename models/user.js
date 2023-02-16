const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userpost: {
    posts: [
      {
        postId: {
          type: Schema.Types.ObjectId,
          ref: 'Post',
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  }
});

module.exports = mongoose.model("User", userSchema);
