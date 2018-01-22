import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import BattleCupPage from '../pages/BattleCupPage.jsx';

const BattleCupPageContainer = createContainer( () => {
	const playersHandle = Meteor.subscribe('Meteor.users.players');
	const loading = !playersHandle.ready();
	return {
		loading,
		users: Meteor.users.find({ "playerProfile.battlecup": true }).fetch(),
	};

}, BattleCupPage);

export default BattleCupPageContainer;