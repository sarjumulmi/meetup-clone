import mongoose, { Schema } from 'mongoose';

const meetupSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, 'Title must be 5 characters minimum.']
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be 10 characters minimum.']
  },
  eventDate: {
    type: Date
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }
}, {
  timestamps: true
});

export default mongoose.model('Meetup', meetupSchema);
