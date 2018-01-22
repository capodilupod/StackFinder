import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PlayerItem from '../components/PlayerItem.jsx';
import { Col, Row } from 'react-bootstrap';


export default class BattleCupPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 	tier: [], 
						language: "none",
						position: []};
	}

	handleChange(name, event, key, value){
		this.setState({
			[name]: value
		});
	}

	render () {
		const { loading, users } = this.props;

		function filterField(playerVals, filteringVals) {
			return playerVals.some(val => filteringVals.includes(val));
		}

		let Players;
		let filteredPlayers = users;

		// Handle Filtering
		filteredPlayers = filteredPlayers.filter(player => (this.state.position.length > 0) ? (filterField(player.playerProfile.position, this.state.position)) : true);
		filteredPlayers = filteredPlayers.filter(player => (this.state.language != "none") ? (player.playerProfile.language == this.state.language) : true);
		filteredPlayers = filteredPlayers.filter(player => (this.state.tier.length > 0) ? (filterField(player.playerProfile.tier, this.state.tier)) : true);

		if (!users || !users.length) {
			Players = (
				<h2>No one has signed up</h2>
			);
		} else {
			Players = filteredPlayers.map(user => (
				<PlayerItem
					key={user._id}
					id={user._id}
					battlecup={true}
					playerProfile={user.playerProfile}
					playerStats={user.playerStats}
				/>
			));
		}

		return (
			<div className="page list-show">
				<Row>
				<Col xs={1} xsOffset={1}> 
					<SelectField
						name="tier"
						floatingLabelText="Tier"
						floatingLabelFixed={true}
						value={this.state.tier}
						multiple={true}
						hintText="Choose Tier(s)"
						onChange={this.handleChange.bind(this, 'tier')}
					>
						<MenuItem insetChildren={true} checked={this.state.tier.includes(2)} value={2} primaryText="Tier 2" />
						<MenuItem insetChildren={true} checked={this.state.tier.includes(3)} value={3} primaryText="Tier 3" />
						<MenuItem insetChildren={true} checked={this.state.tier.includes(4)} value={4} primaryText="Tier 4" />
						<MenuItem insetChildren={true} checked={this.state.tier.includes(5)} value={5} primaryText="Tier 5" />
						<MenuItem insetChildren={true} checked={this.state.tier.includes(6)} value={6} primaryText="Tier 6" />
						<MenuItem insetChildren={true} checked={this.state.tier.includes(7)} value={7} primaryText="Tier 7" />
						<MenuItem insetChildren={true} checked={this.state.tier.includes(8)} value={8} primaryText="Tier 8" />
					</SelectField>
					<br />
					<SelectField
						name="language"
						floatingLabelText="Language"
						value={this.state.language}
						hintText="Choose Language(s)"
						multiple={true}
						onChange={this.handleChange.bind(this, 'language')}
						hintStyle={{opacity: 1}}
					>
						<MenuItem value={"english"} primaryText="English" />
						<MenuItem value={"spanish"} primaryText="Spanish" />
						<MenuItem value={"chinese"} primaryText="Chinese" />
						<MenuItem value={"portugese"} primaryText="Portugese" />
						<MenuItem value={"other"} primaryText="Other" />
					</SelectField>
					<br />
					<SelectField
						name="position"
						floatingLabelText="Position"
						floatingLabelFixed={true}
						value={this.state.position}
						multiple={true}
						hintText="Choose Position(s)"
						onChange={this.handleChange.bind(this, 'position')}
					>
						<MenuItem insetChildren={true} checked={this.state.position.includes(1)} value={1} primaryText="1" />
						<MenuItem insetChildren={true} checked={this.state.position.includes(2)} value={2} primaryText="2" />
						<MenuItem insetChildren={true} checked={this.state.position.includes(3)} value={3} primaryText="3" />
						<MenuItem insetChildren={true} checked={this.state.position.includes(4)} value={4} primaryText="4" />
						<MenuItem insetChildren={true} checked={this.state.position.includes(5)} value={5} primaryText="5" />
					</SelectField>
				</Col>
				<br />
				<div className="content-scrollable list-items">
				<Col xs={8} xsOffset={2}>
					{ Players }
				</Col>
				</div>
				</Row>

			</div>
		)
	}
}