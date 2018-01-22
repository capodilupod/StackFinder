import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import StackInfo from '../pages/StackInfo.jsx';
import { Stacks } from '../../api/stacks/stacks.js'

const StackInfoContainer = createContainer( ({ params: { id }}) => {
	const rosterHandle = Meteor.subscribe('Meteor.users.players', { "playerProfile.teamId": id });
	const rosterLoading = !rosterHandle.ready();
	const stacksHandle = Meteor.subscribe('stacks', { _id: id} );
	const loading = !stacksHandle.ready();


	return {
		loading,
		rosterLoading,
		roster: Meteor.users.find({ "playerProfile.teamId": id }).fetch(),
		stack: Stacks.findOne( {_id: id } ),

	};

}, StackInfo);


export default StackInfoContainer;
