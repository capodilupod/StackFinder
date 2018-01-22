import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Meteor } from 'meteor/meteor';
import axios from 'axios';
import { addPlayerToStack } from '../../api/stacks/methods.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import IconButton from 'material-ui/IconButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Avatar from 'material-ui/Avatar';


const cardImage = {
	  borderTopLeftRadius: "50%",
	  borderTopRightRadius: "50%",
	  borderBottomRightRadius: "50%",
	  borderBottomLeftRadius: "50%",
	  position: "relative",
	  height: "90px",
	  width: "90px",
	  float: "left",

   
  }

 const cardStyle = {
 	  position: "relative",
	  overflow: "hidden",
	  marginTop: "10px",
	  marginLeft: "0",
	  marginBottom: "45px", 
	  marginRgiht: "0px",
	  borderRadius: "2px",
 }





export default class PlayerItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			deaths: 0,
			assists: 0,
			kills: 0,
			wins: 0,
			losses: 0,
			gold_per_min: 0,
			last_hits: 0,
			username: "",
			openDotaMmr: 0,
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(event){
		let userId = this.props.id;
		const username = this.props.playerProfile.username;
		const invite = true;
		addPlayerToStack.call({ userId, username, invite }, (err, res) => 
			{
			});
	};
	
	render() {
		const { username, tier, position, language, bio, steamID, dotaID, email, mmr, avatar } = this.props.playerProfile;
		const { id } = this.props;
		let playerStats = this.props.playerStats;
		const  isBattlecup  = this.props.battlecup;

		let kda = "K/D/A: " + playerStats.kills;
		let lasthits = "Last Hits: " + playerStats.lastHits ;
		let gpm = "GPM: "  + playerStats.gpm ;

		
			

		const battlecupPlayer = (
			<Card containerStyle={cardStyle}>
				<Row>
				<Col sm={7}>
				<CardHeader
					title={	<Link to={`/playerProfile/${id}`} >
						<h2>{username}</h2>
					</Link>}
					subtitle={<div>
						<div>{"Tier: " + tier}</div>
						<div>{"Position: " + position}</div>
						<div>{"Language: " + language}</div>
						</div>}	
				/>
				{bio}
				<CardActions>
					<FlatButton 
						name="button"
						value={username}
						href={"steam://friends/add/" + steamID} 
						label="Add to Steam Friend's List" 
						backgroundColor = "#ED3B1C"
					/>
					<FlatButton 
						name="button"
						value={username}
						href={"https://www.dotabuff.com/players/" + dotaID} 
						label="Dotabuff" 
						backgroundColor = "#ED3B1C"
					/>
					<IconButton
						tooltip="Invite Player to Your Stack"
						onTouchTap={this.onClick}>
						<PersonAdd/>
					</IconButton>
				</CardActions>
				</Col>
				<Col sm={5}>

				<Avatar src={avatar} size={60} style={cardImage} />
				<CardText >
					{kda}
					< br />
					{lasthits}
					< br />
					{gpm}
				</CardText>

				</Col>
				</Row>
			</Card>
		);
			return battlecupPlayer;
	}
}

PlayerItem.propTypes = {
	playerProfile: React.PropTypes.object,
}