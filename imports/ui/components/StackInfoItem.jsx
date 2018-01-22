import React from 'react';
import axios from 'axios';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { HTTP } from 'meteor/http';
import RaisedButton from 'material-ui/RaisedButton';
import { removePlayer } from '../../api/stacks/methods.js';
import { addPlayerToStack, makeCaptain, deleteTeam, getBattleCupData } from '../../api/stacks/methods.js';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router';
import { Col, Row } from 'react-bootstrap';

export default class StackInfoItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			deaths: [],
			assists: [],
			kills: [],
			wins: [],
			losses: [],
			gold_per_min: [],
			last_hits: [],
			username: [],
			openDotaMmr: [],
			display: false,
			openDotaMmrReady: false,
			matchStatsReady: false,
			winLossReady: false,
			selectedRow: undefined,
		};

		this.onRowSelection = this.onRowSelection.bind(this);
		this.addToTeam = this.addToTeam.bind(this);
		this.onClick = this.onClick.bind(this);
		this.makeCaptain = this.makeCaptain.bind(this);
		this.deleteTeam = this.deleteTeam.bind(this);
		this.leaveTeam = this.leaveTeam.bind(this);

	}

	leaveTeam(userToRemoveName, teamId){
		let userToRemoveId = Meteor.userId();
		
		removePlayer.call({ userToRemoveId, userToRemoveName, teamId})
	}


	onRowSelection(selectedRows){
		this.setState({
			selectedRow: selectedRows[0],
		});
	}

	onClick(){
		if(this.state.selectedRow != undefined){
			const userToRemove = this.props.roster[this.state.selectedRow];
			const userToRemoveName = userToRemove.playerProfile.username;
			const userToRemoveId = userToRemove._id;
			const teamId = userToRemove.playerProfile.teamId;

			let response = confirm("Are you sure you want to remove " + userToRemoveName  + "?");
			if(response){
				removePlayer.call({ userToRemoveId, userToRemoveName, teamId });
			}
		}
	}

	addToTeam(userId, username){

		let response = confirm("Are you sure you want to add " + username + " to your stack?");
		if(response){
			addPlayerToStack.call({ userId, username }, (err, res) =>{
			});
		}

	}

	makeCaptain(){
		if(this.state.selectedRow != undefined){
			const newCaptain = this.props.roster[this.state.selectedRow];
			const newCaptainId = newCaptain._id;
			const teamId = this.props.stack._id;

			makeCaptain.call({ teamId, newCaptainId }, (err, res) => {
				});
		}
	}

	deleteTeam(){
		const teamId = this.props.stack._id;
		deleteTeam.call({ teamId }, (err, res) =>{
			if(err){
					alert("You must remove all the players from your team before deleting it");
			}
			else{
				this.context.router.push('/');
			}
		});
	}

	componentDidMount(){
			const roster = this.props.roster;
			let players = roster.map(player =>(
					player.playerProfile.dotaID
			));

			let params = "";
			let result;
			if(players.length > 1){
				for(let i = 1; i < players.length; i++){
					params = params.concat("&=" + players[i]);
				}
				let query = "https://api.opendota.com/api/players/" + params + "/matches/?lobby_type=9&included_account_id=";
				//result = HTTP.get(query);
			}
			else if(players.length == 1){
				let query = "https://api.opendota.com/api/players/" + players[0] + "/matches/?lobby_type=9";
				HTTP.call('GET', query ,(error, result) => {
				  if (!error) {
				  }
				});
			}
			else{
				let query = "";
			}

	}

	render(){
		const stack = this.props.stack;
		const roster = this.props.roster;
		const currentUserId = this.props.currentUser;

		let rosterIds = roster.map(player =>(
					player._id
			));


		let players = roster.map((player, i) =>
				<TableRow key={player._id} >
					<TableRowColumn>{ <Link to={`/playerProfile/${player._id}`} className="link-auth-alt">{player.playerProfile.username} </Link>}</TableRowColumn>
					<TableRowColumn>{ player.playerProfile.position }</TableRowColumn>
					<TableRowColumn>{ player.playerStats.wins + "/" + player.playerStats.losses } </TableRowColumn>
					<TableRowColumn>{ player.playerStats.kills + "/" + player.playerStats.deaths + "/" + player.playerStats.assists }</TableRowColumn>
					<TableRowColumn>{ player.playerStats.lastHits }</TableRowColumn>
					<TableRowColumn>{ player.playerStats.gpm }</TableRowColumn>
				</TableRow>
			);
		let wantToJoin;
		if(stack && rosterIds.includes(Meteor.userId())){
			 wantToJoin = stack.joinRequests.map(player => {
			 	if(!rosterIds.includes(player.id)){
					return <div key={player.id}>
							<ListItem primaryText={<Link to={`/playerProfile/${player.id}`} className="link-auth-alt">{player.name}</Link>} key={player.id}
									  rightIconButton={<RaisedButton label={"Add to Your Stack"}  id={player.id} secondary={true} onClick={() => this.addToTeam(player.id, player.name)} />}
							/>
							</div>
				}
			})
		}
		else{
			wantToJoin = [];
		}

		let steamID;
		let addToSteam;
		if(this.props.roster[this.state.selectedRow] != undefined){
			steamID = this.props.roster[this.state.selectedRow].playerProfile.steamID;
			disabled = false;
		}
		else{
			steamID = null; 
			disabled = true;
		}

		let makeCaptainButton;
		let deleteTeam;
		let removePlayer
		if(stack.captain == Meteor.userId()){
			makeCaptainButton = <RaisedButton label="Make Player Captain" onTouchTap={this.makeCaptain}  disabled={disabled} primary={true} />;
			deleteTeam = <RaisedButton label="Delete Stack" onTouchTap={this.deleteTeam} secondary={true} />;
			removePlayer = 	<RaisedButton 
								label="Remove Selected Player"
								onTouchTap={this.onClick}
								primary={true}
								disabled={disabled}
							/>
		}
		else{
			makeCaptainButton = null;
			deleteTeam = null;
			removePlayer = null;
		}

		let leaveTeam;
		if(rosterIds.includes(Meteor.userId())){
			index = rosterIds.indexOf(Meteor.userId());
			const { username, teamId }= roster[index].playerProfile;
			leaveTeam = <RaisedButton 
							label="Leave Team"
							onTouchTap={() => this.leaveTeam(username, teamId )}
							primary={true}
							/>
		}


		return(
				<div>
					<h1>{stack.stackName}</h1>
					<Table selectable={true} onRowSelection={this.onRowSelection}>
						<TableHeader adjustForCheckbox={false} displaySelectAll={false} >
							<TableRow >
								<TableHeaderColumn>Player</TableHeaderColumn>
								<TableHeaderColumn>Position(s)</TableHeaderColumn>
								<TableHeaderColumn>Win / Loss</TableHeaderColumn>
								<TableHeaderColumn> Average KDA </TableHeaderColumn>
								<TableHeaderColumn> Average Last Hits </TableHeaderColumn>
								<TableHeaderColumn> Average GPM </TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
							{players}
						</TableBody>
					</Table>
					<Toolbar>
						<ToolbarGroup firstChild={true}>							
							<RaisedButton
								name="button" 
								label="Add to Steam Friend's List" 
								href={"steam://friends/add/" + steamID}
								disabled={disabled}
								primary={true}
							/>
							{makeCaptainButton}
							{removePlayer}
							{deleteTeam}
							{leaveTeam}
						</ToolbarGroup>
					</Toolbar>
					<Subheader>Players Requesting to Join </Subheader>
					<Col sm={4}>
					<List>
						{wantToJoin}
					</List>
					</Col>
				</div>

		)
	}
}

StackInfoItem.contextTypes = {
	router: React.PropTypes.object
};