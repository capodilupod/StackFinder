import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import StackInfoItem from '../components/StackInfoItem.jsx';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { removePlayer } from '../../api/stacks/methods.js'; 
import FlatButton from 'material-ui/FlatButton';


export default class StackInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = { loading: true
			};
			
		this.removePlayerFromStack = this.removePlayerFromStack.bind(this);
		this.handleRowSelection = this.handleRowSelection.bind(this);

	}

	removePlayerFromStack(event){
		const target = event.target;
		const userToRemoveName = target.name;
		const userToRemoveId = target.id;

		removePlayer.call({ userToRemoveId, userToRemoveName }, (err, res) => {
			if(err){
			};
		});

	}

	handleRowSelection(selectedRows){
		console.log(selectedRows);
  	};

	render(){
		let loading = this.props.loading;

		if(loading){
			return(<h1> Loading </h1>);
		}
		else{
			const stack = this.props.stack;
			const { roster } = this.props;
			const currentUser = Meteor.userId();

			return(<StackInfoItem
					stack={stack}
					roster={roster}
					currentUser={currentUser}
					/>
					);
		}
	}

}

StackInfo.PropTypes = {
	stack: React.PropTypes.object,
}
