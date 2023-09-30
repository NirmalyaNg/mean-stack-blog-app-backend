const mongoose = require('mongoose');
const Comment = require('../models/comment');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    permalink: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
      validate: (value) => {
        if (/\s/.test(value)) {
          throw new Error('Permalink cannot contain spaces');
        }
      },
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      default: 'new',
    },
  },
  { timestamps: true }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
});

// Delete all comments of specific post after deletion
postSchema.post('deleteOne', async function (next) {
  const post = this;
  await Comment.deleteMany({
    postId: post._id,
  });
  next();
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
