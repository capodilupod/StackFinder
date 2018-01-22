import React from 'react';
import PlayerItem from '../components/PlayerItem.jsx';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import StackItem  from '../components/StackItem.jsx';
import List from 'material-ui/List';
import Autocomplete from 'react-autocomplete';
import { Col, Row } from 'react-bootstrap';

const matchToTerm = function (state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
};



export default class StacksPage extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			value: "",
		}
	}

	render() {
	const { stacks } = this.props;

	let stackItems;

	filteredStacks = stacks.filter((stack) => {
		if(this.state.value !== ""){
			return(stack.stackName.toLowerCase().indexOf(this.state.value.toLowerCase())!== -1);
		}
		else{
			console.log("this shoudl all be true");
			return true;
		}
	});


	stackItems = filteredStacks.map(stack => (
		<StackItem stackName={stack.stackName}
					description={stack.description}
					roster={stack.roster}
					id={stack._id}
					key={stack._id} />
		));

	let StackNames = filteredStacks.map((stack)  => {return { "name": stack.stackName.toLowerCase() }});


		return(<div> 
			<Row>
				<Col xs={2}>
					<div>
					<Link to="/stackCreate" className="link-auth-alt">
						Create a Stack
					</Link>
					</div>
					<Autocomplete
						hintText="Search for Teams"
						hintStyle={{opacity: 1}}
						getItemValue={(item) => item.name }
						items={StackNames}
						renderItem={(item, isHighlighted) =>
		   					<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
						      {item.name}
						    </div>
						}
						value={this.state.value}
						onChange={(event, value) => this.setState({ value })}
						onSelect={ value => this.setState({ value })}
						shouldItemRender={ matchToTerm }

					/>
				</Col>
				<Col xs={8} xsOffset={.5}>
				<List>
					{stackItems}
				</List>
				</Col>
			</Row>

			</div>
		)
		
	}



}

StacksPage.propTypes = {
  stacks: React.PropTypes.array,     
};

StacksPage.contextTypes = {
  router: React.PropTypes.object,
};


