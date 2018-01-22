import React from 'react';
import { Meteor } from 'meteor/meteor';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Col, Row } from 'react-bootstrap';
import { createStack } from '../../api/stacks/methods.js';

export default class CreateStackPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			stackName: '',
			description: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	handleChange(event){
		let name = event.target.name;

		this.setState({
			[name]: event.target.value
		})


	}

	onSubmit(event){
		event.preventDefault();
		const stackName = this.state.stackName;
		const description = this.state.description;
		const id = "wateverRightNow";

		createStack.call( {stackName, description}, (err) => {
			if ( err ) {
				alert(err);
			} else {
				this.context.router.push('/stacks');
			}

		});

	}

	render(){
		return(
			<div className="wrapper-auth">
				<Col sm={6} smOffset={4}>
					<h1 className="title-auth">
					Create Your Stack!
					</h1>
				<form onSubmit={this.onSubmit}>
					<div className="input-symbol">
						<TextField
							name="stackName"
							floatingLabelText="Stack Name"
							floatingLabelFixed={true}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<TextField
							name="description"
							hintText="Add a Short Description"
							floatingLabelText="Stack Description"
	      					floatingLabelFixed={true}
	      					onChange={this.handleChange}
						/>
					</div>
					<button type="submit" className="btn-primary">
						Register Your Stack
					</button>
				</form>
				</Col>
			</div>

		)
	}


	}

CreateStackPage.contextTypes = {
	router: React.PropTypes.object
};