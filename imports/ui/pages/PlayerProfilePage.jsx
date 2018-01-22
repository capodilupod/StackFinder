import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import {List, ListItem} from 'material-ui/List';
import { acceptJoinInvite } from '../../api/stacks/methods.js';


const style = {
	padding: '40px',
}



export default class PlayerProfilePage extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(stackId, stackName, newUsername){	
		acceptJoinInvite.call({stackId, stackName, newUsername}, (err, res) =>{
			if(err){
			}
		});

	}

	render () {
		const { loading } = this.props;

		if(loading){
			return(<h1> Loading </h1>);
		}
		else{
			const { user } = this.props;
			const { stack } = this.props;
			console.log(stack);
			const playerStats = user[0].playerStats;
			const { mmr, username, steamID, dotaID, bio } = user[0].playerProfile
			console.log(user[0]);
			let disabled = false;
			let teamId;
			let teamName;
			let teamLink;
			let viewTeamButton;

			let invites = user[0].playerProfile.invites;
			let displayInvites;

			if(user[0]._id == Meteor.userId() && invites){
				displayInvites = invites.map((invite) =>
												<ListItem key={invite.id} primaryText={<Link to={`/stackInfo/${invite.id}`} className="link-auth-alt">{invite.name}</Link>} 
														  children={<RaisedButton  
														  				key={invite.id} 
														  				onClick={() => this.onClick(invite.id, invite.name, username)} 
														  				label="Join This Team"
														  				primary={true}
														  				/>}
												/>
												)
			}
			else{
			 	displayInvites = [];
			}

			if( user[0].playerProfile.teamId ){
				teamId = user[0].playerProfile.teamId;
				viewTeamButton = <RaisedButton
						label= "View team"
						containerElement={<Link to={`/stackInfo/${teamId}`} />}
						primary={true}
						style={{verticalAlign: "middle"}}
					/>
				teamName=stack.stackName;

			}
			else{
				teamId=null;
				teamName = "";
				viewTeamButton = null;
			}


			return(
				<Row>
				<Col sm={2}>
					<List>
					<ListItem primaryText="Invites" disabled={true} />
					{displayInvites}
					</List>
				</Col>
				<Col xs={12} sm={8} smOffset={1}>
				<Card>
					<CardMedia overlay={<CardTitle title={ username +" - " + teamName  } subtitle={
						<div>						
							<RaisedButton
								name="button" 
								label="Add to Steam Friend's List" 
								href={"steam://friends/add/" + steamID}
								primary={true}
							/>
							<RaisedButton
								href={"https://www.dotabuff.com/players/" + dotaID} 
								label="Dotabuff" 
								primary={true}
							/>
							{viewTeamButton}
							<br />
						</div>

					} />} 
						>
						 <img src="http://evilgeniuses.gg/images/deadgaem-37ddba66.svg" alt="" />
					</CardMedia>
					<CardTitle title="Player Stats Over Last 20 Matches" 
						subtitle={"Win/Loss: " + playerStats.wins  + "/" + playerStats.losses
								+ " | Kills: " + playerStats.kills 
								+ " | Deaths: " + playerStats.deaths
								+ " | Assists: " + playerStats.assists
								+ " | Last Hits: " + playerStats.lastHits
								+ " | GPM: " + playerStats.gpm
								+ " | Solo MMR: " + mmr
								+ " | Solo MMR (via OpenDota): " + playerStats.openDotaMmr }
					/>
					<CardText>
					{ bio }
					</CardText>
				</Card>
				</Col>
				</Row>

			)
		}


	}
}