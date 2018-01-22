import { Meteor } from 'meteor/meteor';
import { Stacks } from '../stacks.js';

Meteor.publish('stacks', function () {
	return Stacks.find({}); 
});