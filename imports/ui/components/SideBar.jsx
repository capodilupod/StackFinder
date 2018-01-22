import React from 'react';
import UserMenu from '../components/UserMenu.jsx';
import UserOptionMenu from '../components/UserOptionMenu.jsx';
import Divider from 'material-ui/Divider';

export default class SideBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { user, logout } = this.props;
		return( 
			<div>
				<UserMenu user={ user } logout={ logout } />
				<Divider />
			</div>
		)	
	}
}

SideBar.propTypes = {
	user: React.PropTypes.object,
	logout: React.PropTypes.func,
};