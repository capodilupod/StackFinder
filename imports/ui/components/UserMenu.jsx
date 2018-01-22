import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import Dialog from 'material-ui/Dialog';
import { updateNotifications } from '../../api/stacks/methods.js';



export default class UserMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			teamName: null,
		}

		this.onTitleTouchTap = this.onTitleTouchTap.bind(this);
		this.onTouchTap = this.onTouchTap.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentWillReceiveProps(nextProps){
		console.log(Meteor.userId());

		//make sure there are new invites
		if(this.props.user){
			if(this.props.user.playerProfile){
				if(this.props.user.playerProfile.invites){
					if(nextProps.user.playerProfile.invites.length > this.props.user.playerProfile.invites.length){
						this.setState({
							open: true,
							teamName: nextProps.user.playerProfile.invites.name,
						});
						console.log(nextProps.user.playerProfile.invites);
					}
				}
			}
		}

	}

	onTitleTouchTap(){
		this.context.router.push('/');
	}

	onTouchTap(id){
		updateNotifications.call({id}, (err, res) =>{

		});
	}

	handleClose(){
    	this.setState({
    		open: false,
    		teamName: null,
    	});
  	};



	renderLoggedIn() {
		const actions = [
	      <FlatButton
	        label={"Join Team " + this.state.teamName}
	        primary={true}
	        //onTouchTap={this.handleClose}
	      />,
	      <FlatButton
	        label="Decide Later"
	        primary={true}
	        //onTouchTap={this.handleClose}
	      />,
	      <FlatButton 	
	      	label="Do Not Join"
	      	primary={true}
	      	/>,

	    ];

		const { user, logout } = this.props;
		let displayNotifications;
		let notifications = user.playerProfile.invites;
		let newNotifications = [];

		if(notifications){
			for(let i = 0; i < notifications.length; i++){
				if(notifications[i].new){
					newNotifications.push(notifications[i]);
				}
			}
		}
		if(user.playerProfile.invites){
			displayNotifications = newNotifications.map((invite) => 
									<MenuItem key={invite.id} value={invite.id} primaryText={invite.name} onTouchTap={() => this.onTouchTap(invite.id)} />);
					
		}
		else{
			displayNotifications = [];
		}

		let numNotifications = displayNotifications.length;
		// this.setState({


		// })

		return (
			<div>
			<AppBar
				title="BattleCup Stack Finder"
				onTitleTouchTap={this.onTitleTouchTap}
				iconElementRight={
						<ToolbarGroup firstChild={true}>
							<IconMenu
							     iconButtonElement={<IconButton tooltip="Notifications">
							     						<NotificationsIcon />
							    					</IconButton>}
							>
							{displayNotifications}
						    </IconMenu>
							<Badge
								badgeContent={numNotifications}
								>
							</Badge>
						 	<FlatButton label={user.playerProfile.username} containerElement={<Link to={`/playerProfile/${user._id}`}/>} />
							<FlatButton label="Stacks" containerElement={<Link to="/stacks"/>} />
							<FlatButton label="Players" containerElement={<Link to="/battlecup"/>} />
							<FlatButton label="Logout" onClick={logout}/>
						</ToolbarGroup>
				}
				showMenuIconButton={false}
			/>
			<Dialog
			 title="New Invite to Team"
          	 actions={actions}
          	 open={this.state.open}
          	 onRequestClose={this.handleClose}
          	 	/>
			</div>
		);
	}

	renderLoggedOut() {
		return (
			<AppBar
				title="BattleCup Finder"
				onTitleTouchTap={this.onTitleTouchTap}
				iconElementRight={
						<ToolbarGroup firstChild={true}>
							<FlatButton label="Stacks" containerElement={<Link to="/stacks"/>} />
							<FlatButton label="Players" containerElement={<Link to="/battlecup"/>} />
							<FlatButton label="Join" containerElement={<Link to="/join"/>} />
							<FlatButton label="Sign In" containerElement={<Link to="/signin"/>} />
						</ToolbarGroup>
				}
				showMenuIconButton={false}
			/>
		);
	}

	render() {
		return this.props.user
			? this.renderLoggedIn()
			: this.renderLoggedOut();
	}
}

UserMenu.propTypes = {
	user: React.PropTypes.object,
	logout: React.PropTypes.func,
};

UserMenu.contextTypes = {
	router: React.PropTypes.object
};