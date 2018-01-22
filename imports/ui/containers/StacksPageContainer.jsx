import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import StacksPage from '../pages/StacksPage.jsx';
import { Stacks } from '../../api/stacks/stacks.js'

const StacksPageContainer = createContainer( () => {
	const stacksHandle = Meteor.subscribe('stacks');
	const loading = !stacksHandle.ready();

	return {
		loading,
		stacks: Stacks.find( { } ).fetch(),
	};

}, StacksPage);

export default StacksPageContainer;
