import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Navbar } from 'react-bootstrap';

import SideBar from '../components/SideBar.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps({ loading, children }) {
		if (!loading && !children) {
			this.context.router.replace(`/battlecup`);
		}
	}

	logout() {
		Meteor.logout();
	}

	render() {
		const {
			user,
			children,
		} = this.props;

		const clonedChildren = children && React.cloneElement(children, {
			key: location.pathname,
		});

		return (
			<MuiThemeProvider>
				<div style={{width: "100%"}}>
					<section>
						<SideBar user={user} logout={this.logout} />
					</section>

					<div>
			         	<ReactCSSTransitionGroup
			        		transitionName="fade"
			         		transitionEnterTimeout={200}
			         		transitionLeaveTimeout={200}
			         	>
			         			{clonedChildren}
			        		</ReactCSSTransitionGroup>
			        </div>
				</div>
			</MuiThemeProvider>
			)
	}
}


App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  loading: React.PropTypes.bool,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};
