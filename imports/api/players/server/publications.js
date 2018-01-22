import { Meteor } from 'meteor/meteor';

Meteor.publish('Meteor.users.players', function players() {
	const options = {
		fields: {
			playerProfile: 1,
			playerStats: 1,
		}
	};

	return Meteor.users.find({}, options);
});