import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Group name must be 5 characters minimum.']
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Group name must be 10 characters minimum.']
  },
  category: {
    type: String
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup'
  }]
}, { timestamps: true });

GroupSchema.statics.addMeetup = async function (id, args) {
  const Meetup = mongoose.model('Meetup');
  // We add the group id to the meetup group element
  // Finally this is the author of the meetup
  const meetup = await new Meetup({ ...args, group: id });
  // We found the group with the id provide in the url
  // And we push the meetup id in the meetups element
  const group = await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

  return {
    meetup: await meetup.save(),
    group
  };
};

export default mongoose.model('Group', GroupSchema);
