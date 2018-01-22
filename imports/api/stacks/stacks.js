import { Mongo } from 'meteor/mongo';

export const Stacks = new Mongo.Collection('stacks');

Stacks.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});