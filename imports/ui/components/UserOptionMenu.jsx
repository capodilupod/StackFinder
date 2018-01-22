import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import updatePlayer from '../../api/players/methods.js';





export default class UserOptionMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 	tier: [], 
						language: "",
						position: []};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.checkArray = this.checkArray.bind(this);
	}

	checkArray(val, name){
		if(name == 'tier'){
			checkedArray = this.state.tier;
		}
		else{
			checkedArray = this.state.position;
		}
		if(checkedArray.includes(val)){
			index = checkedArray.indexOf(val);
			//remove element from array safely
			checkedArray.splice(index, 1);
		}
		else{
			checkedArray.push(val);
		}

		this.setState({
			name: checkedArray,
		});
	}



	handleChange(name, event, key, value){
		this.setState({
			[name]: value
		});
	}

	onSubmit(event){
		event.preventDefault();
		let tier = this.state.tier;
		let position = this.state.position;
		let language = this.state.language;

		updatePlayer.call({tier, position, language});
	}

	render() {
		const { user } = this.props;
		if(user){
			return (
				<div className="page list-show">
					<form onSubmit={this.onSubmit}>
						<div className="content-scrollable list-items">
							<SelectField
								name="tier"
								floatingLabelText="Change Tier"
								floatingLabelFixed={true}
								value={this.state.tier}
								multiple={true}
								hintText="Any Tier"
								onChange={this.handleChange.bind(this, 'tier')}
							>
								<MenuItem insetChildren={true} checked={this.state.tier.includes(2)} onTouchTap={this.checkArray.bind(this, 2, 'tier')} value={2} primaryText="Tier 2" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(3)} onTouchTap={this.checkArray.bind(this, 3, 'tier')} value={3} primaryText="Tier 3" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(4)} onTouchTap={this.checkArray.bind(this, 4, 'tier')} value={4} primaryText="Tier 4" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(5)} onTouchTap={this.checkArray.bind(this, 5, 'tier')} value={5} primaryText="Tier 5" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(6)} onTouchTap={this.checkArray.bind(this, 6, 'tier')} value={6} primaryText="Tier 6" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(7)} onTouchTap={this.checkArray.bind(this, 7, 'tier')} value={7} primaryText="Tier 7" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(8)} onTouchTap={this.checkArray.bind(this, 8, 'tier')} value={8} primaryText="Tier 8" />
							</SelectField>
							<SelectField
								name="position"
								floatingLabelText="Change Position"
								floatingLabelFixed={true}
								value={this.state.position}
								multiple={true}
								hintText="Any Position"
								onChange={this.handleChange.bind(this, 'position')}
							>
								<MenuItem insetChildren={true} checked={this.state.position.includes(1)} onTouchTap={this.checkArray.bind(this, 1, 'position')} value={1} primaryText="1" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(2)} onTouchTap={this.checkArray.bind(this, 2, 'position')} value={2} primaryText="2" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(3)} onTouchTap={this.checkArray.bind(this, 3, 'position')} value={3} primaryText="3" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(4)} onTouchTap={this.checkArray.bind(this, 4, 'position')} value={4} primaryText="4" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(5)} onTouchTap={this.checkArray.bind(this, 5, 'position')} value={5} primaryText="5" />
							</SelectField>
							<SelectField
								name="language"
								floatingLabelText="Change Language"
								value={this.state.language}
								onChange={this.handleChange.bind(this, 'language')}
							>
								<MenuItem value={"none"} primaryText="Any Language" />
								<MenuItem value={"english"} primaryText="English" />
								<MenuItem value={"spanish"} primaryText="Spanish" />
								<MenuItem value={"chinese"} primaryText="Chinese" />
								<MenuItem value={"portugese"} primaryText="Portugese" />
								<MenuItem value={"other"} primaryText="Other" />
							</SelectField>
						</div>
						<button type="submit" className="btn-primary">
							Save Changes
						</button>
					</form>
				</div>
			)
		}
		return null	

	}
}

