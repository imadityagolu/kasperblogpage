const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentLikeSchema = new Schema({
  comment: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  guestEmail: { type: String },
  guestId: { type: String },   
  ip: { type: String },         
  type: { type: String, enum: ['like','dislike'], default: 'like' },
  created_at: { type: Date, default: Date.now },
});

// Unique indexes to prevent duplicate likes by same user or guest
CommentLikeSchema.index(
  { comment: 1, user: 1 },
  { unique: true, partialFilterExpression: { user: { $exists: true } } }
);
CommentLikeSchema.index(
  { comment: 1, guestEmail: 1 },
  { unique: true, partialFilterExpression: { guestEmail: { $exists: true } } }
);
CommentLikeSchema.index(
  { comment: 1, guestId: 1 },
  { unique: true, partialFilterExpression: { guestId: { $exists: true } } }
);
CommentLikeSchema.index(
  { comment: 1, ip: 1 },
  { unique: true, partialFilterExpression: { ip: { $exists: true } } }
);

module.exports = mongoose.model('CommentLike', CommentLikeSchema);
