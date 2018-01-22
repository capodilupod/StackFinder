import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PlayerProfilePage from '../pages/PlayerProfilePage.jsx';
import { Stacks } from '../../api/stacks/stacks.js'

const PlayersPageContainer = createContainer( ({ params: { id }}) => {
	const playersHandle = Meteor.subscribe('Meteor.users.players');
	const loading = !playersHandle.ready();
	return {
		loading,
		user: Meteor.users.find({ _id: id }).fetch(),
		stack: Stacks.findOne({ "roster.id": id }),
	};

}, PlayerProfilePage);

export default PlayersPageContainer;