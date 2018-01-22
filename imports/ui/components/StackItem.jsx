import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { requestToJoin } from '../../api/stacks/methods.js';

export default class StackItem extends React.Component {
	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(event){
		const userToAddId = Meteor.userId();
		const teamId = this.props.id;
		requestToJoin.call({ userToAddId, teamId }, (err, res) => 
			{
				if(err){
					alert("You can not request to join another team while already on one.");
				}
			});
	}

	render(){
		const teamId = this.props.id;
		let roster = this.props.roster.map(player =>(
							<ListItem key={player.id} primaryText={player.name}> </ListItem>	 
						));

		return(
		<Card>
			<CardHeader showExpandableButton={true}
			title={<Link to={`/stackInfo/${teamId}`} className="link-auth-alt">
						{this.props.stackName}
				</Link>}
			/>
			<CardText>
			{this.props.description}
			</CardText>
			<CardActions>
     		 <RaisedButton
     		 	label={"Request to Join " + this.props.stackName}
     		 	onClick={this.onClick}
     		 	/>
    		</CardActions>
			<CardHeader expandable={true}
						title="Current Roster"
						subtitle={roster}
			/>
		</Card>
		)	
	}
}