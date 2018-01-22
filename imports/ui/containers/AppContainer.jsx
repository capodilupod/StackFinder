import { Meteor } from 'meteor/meteor';

import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

export default createContainer(() => {
	const playersHandle = Meteor.subscribe('Meteor.users.players');
	const stacksHandle = Meteor.subscribe('stacks');
	return {
		user: Meteor.users.findOne({_id: Meteor.userId()}),
		loading: !playersHandle.ready(),
	};
}, App);