//Anyone (guest or logged-in user) can like a blog

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    guestEmail: {
  type: String,
  required: function () {
    return !this.user; // required only for guest likes
  },
},

      ip: {
         type: String, 
         required: true 
        },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate likes from same IP for the same blog
LikeSchema.index({ blog: 1, ip: 1 }, { unique: true });

module.exports = mongoose.model('Like', LikeSchema);