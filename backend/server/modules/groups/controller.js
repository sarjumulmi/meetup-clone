import Group from './model';
import { Meetup } from './../meetups';

export const createGroup = async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400).json({ error: true, message: 'Name must be provided.' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: true, message: 'Name must be string.' });
  } else if (name.length < 5) {
    res.status(400).json({ error: true, message: 'Name must be longer than 5 characters.' });
  }

  if (!description) {
    res.status(400).json({ error: true, message: 'Description must be provided.' });
  } else if (typeof description !== 'string') {
    res.status(400).json({ error: true, message: 'Description must be string.' });
  } else if (description.length < 10) {
    res.status(400).json({ error: true, message: 'Description must be longer than 10 characters.' });
  }

  const group = new Group({ name, description });

  try {
    return res.status(201).json({ error: false, group: await group.save() });
  } catch (err) {
    res.status(400).json({ error: true, message: 'Error creating group.' });
  }
};

export const createGroupMeetup = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
    res.status(400).json({ error: true, message: 'Title must be provided.' });
  } else if (typeof title !== 'string') {
    res.status(400).json({ error: true, message: 'Title must be string.' });
  } else if (title.length < 5) {
    res.status(400).json({ error: true, message: 'Title must be longer than 5 characters.' });
  }

  if (!description) {
    res.status(400).json({ error: true, message: 'Description must be provided.' });
  } else if (typeof description !== 'string') {
    res.status(400).json({ error: true, message: 'Description must be string.' });
  } else if (description.length < 10) {
    res.status(400).json({ error: true, message: 'Description must be longer than 10 characters.' });
  }

  if (!groupId) {
    res.status(400).json({ error: true, message: 'Group Id must be provided.' });
  }

  try {
    const { meetup, group } = await Group.addMeetup(groupId, { title, description });
    return res.status(201).json({ error: false, meetup, group });
  } catch (err) {
    res.status(400).json({ error: true, message: 'Error creating Meetup.' });
  }
};

export const getGroupMeetup = async (req, res) => {
  const { groupId } = req.params;
  if (!groupId) {
    res.status(400).json({ error: true, message: 'Group Id must be provided.' });
  }

  const group = await Group.findById(groupId);
  if (!group) {
    res.status(400).json({ error: true, message: 'Group doesnot exist.' });
  }
  try {
    res.status(200).json({ error: false,
      meetups: await Meetup.find({ group: groupId }).populate('group', 'name')
    });
  } catch (err) {
    res.status(400).json({ error: true, message: 'Cannot fetch meetups for group' });
  }
};
