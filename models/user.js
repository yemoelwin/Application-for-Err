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
  resetToken: String,
  resetTokenExpiration: Date,
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
