const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReplySchema = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: false,
    },
   guest: {
    name: {
      type: String,
      required: function() {
        return !this.user;
      }
    },
    email: {
      type: String,
      lowercase: true,
      required: function() {
        return !this.user;
      }
    }
  },
    content:{
        type:String,
        required:true
    },
    // approved:{
    //     type:Boolean,
    //     default:false
    // },
     status: {
    type: String,
    enum: ['pending', 'approved', 'disapproved'],
    default: 'pending'
  },

    date:{
        type:Date,
        default: Date.now
    },
    likes: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        guestEmail: {type:String, lowercase: true}
      }],

      dislikes:[{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
       guestEmail: {type:String, lowercase: true,match: [/.+\@.+\..+/, 'Please enter a valid email']}
      }],
});

const CommentSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
         index: true, 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    content: {
        type: String,
        required: true
    },
    // likes: [{
    //     type:Schema.Types.ObjectId,
    //     ref: 'Like',
    //     default:null
    // }],
    likes: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        guestEmail: {type:String, lowercase: true}
      }],

      dislikes:[{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
       guestEmail: {type:String, lowercase: true ,match: [/.+\@.+\..+/, 'Please enter a valid email']}
      }],
    guest: {
    name: {
      type: String,
      required: function() {
        return !this.user;
      }
    },
    email: {
      type: String,
      lowercase: true,
      required: function() {
        return !this.user;
      }
    }
  },
    date: {
        type: Date,
        default: Date.now
    },
    // approved: {
    //     type: Boolean,
    //     default: false
    // },
    status: {
    type: String,
    enum: ['pending', 'approved', 'disapproved'],
    default: 'pending'
  },
    replies:[ReplySchema]
}
, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
