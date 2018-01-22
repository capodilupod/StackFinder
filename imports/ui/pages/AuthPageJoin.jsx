import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import updatePlayer from '../../api/players/methods.js';

import AuthPage from './AuthPage.jsx';

export default class JoinPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			errors: {},
			position: [],
			tier: [],
			language: "",
			battlecup: true,
			lookingForMore: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.checkArray = this.checkArray.bind(this);
		this.checkBoxChange = this.checkBoxChange.bind(this);
	}

	onChange(name, event, key, value) {
		this.setState({
			[name]: value
		});
	}

	checkBoxChange(event){
		const target = event.target;
		const value = target.checked;
		this.setState({
			battlecup: true,
		})
	}

	handleClick(event) {
		Meteor.loginWithSteam();
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



	onSubmit(event) {
		event.preventDefault();
		const email = this.email.value;
		const password = this.password.value;
		const confirm = this.confirm.value;
		const position = (this.state.position);
		const tier = (this.state.tier);
		const language = this.state.language;
		const bio = this.bio.value;
		const battlecup = this.state.battlecup;
		const lookingForMore = this.state.lookingForMore;
		const mmr = Number(this.mmr.value);
		const errors = {};

		if (!email) {
			errors.email = "Email Required";
		}
		if (!password) {
			errors.password = "Password Required";
		}
		if (confirm !== password) {
			errors.confirm = "Passwords Do Not Match!";
		}		

		this.setState({ errors });

		if (Object.keys(errors).length) {
			return;
		}

		updatePlayer.call({
			email, password, position, tier, language, bio, mmr, battlecup, lookingForMore } , (err, res) => {
			if ( err ) {
				console.log(err);
				alert(err);
			} else {
				this.context.router.push('/');
			}

		});

	}

	render() {
		const { errors } = this.state;
		const errorMessages = Object.keys(errors).map(key => errors[key]);
		const errorClass = key => errors[key] && 'error';

		const contentForSteamLoggedIn = (
			<div className="wrapper-auth">
				<h1 className="title-auth">
					Looking for a Team?
				</h1>
				<p className="subtitle-auth">
					Solo Player Sign Up Here!
				</p>

				<form onSubmit={this.onSubmit}>
					<div className="list-errors">
						{errorMessages.map(msg => (
			  				<div className="list-item" key={msg}>{msg}</div>
						))}
					</div>
					<div className={`input-symbol ${errorClass('email')}`}>
						<input
						  type="email"
						  name="email"
						  ref={(c) => { this.email = c; }}
						  placeholder="Your Email"
						/>
						<span
						  className="icon-email"
						/>
					</div>
					<div className={`input-symbol ${errorClass('password')}`}>
						<input
						  type="password"
						  name="password"
						  ref={(c) => { this.password = c; }}
						  placeholder={'Your Password'}
						/>
						<span
						  className="icon-lock"
						/>
					</div>
					<div className={`input-symbol ${errorClass('confirm')}`}>
						<input
						  type="password"
						  name="confirm"
						  ref={(c) => { this.confirm = c; }}
						  placeholder={'Confirm Password'}
						/>
						<span
						  className="icon-lock"
						/>
					</div>
					<div className={`input-symbol ${errorClass('confirm')}`}>
						<SelectField
								name="position"
								floatingLabelText="Choose Position"
								floatingLabelFixed={true}
								value={this.state.position}
								multiple={true}
								onChange={this.onChange.bind(this, 'position')}
							>
								<MenuItem insetChildren={true} checked={this.state.position.includes(1)} onTouchTap={this.checkArray.bind(this, 1, 'position')} value={1} primaryText="1" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(2)} onTouchTap={this.checkArray.bind(this, 2, 'position')} value={2} primaryText="2" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(3)} onTouchTap={this.checkArray.bind(this, 3, 'position')} value={3} primaryText="3" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(4)} onTouchTap={this.checkArray.bind(this, 4, 'position')} value={4} primaryText="4" />
								<MenuItem insetChildren={true} checked={this.state.position.includes(5)} onTouchTap={this.checkArray.bind(this, 5, 'position')} value={5} primaryText="5" />
							</SelectField>
					</div>
					<div className={`input-symbol ${errorClass('confirm')}`}>
						<SelectField
								name="tier"
								floatingLabelText="Choose Tier"
								floatingLabelFixed={true}
								value={this.state.tier}
								multiple={true}
								onChange={this.onChange.bind(this, 'tier')}
							>
								<MenuItem insetChildren={true} checked={this.state.tier.includes(2)} onTouchTap={this.checkArray.bind(this, 2, 'tier')} value={2} primaryText="Tier 2" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(3)} onTouchTap={this.checkArray.bind(this, 3, 'tier')} value={3} primaryText="Tier 3" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(4)} onTouchTap={this.checkArray.bind(this, 4, 'tier')} value={4} primaryText="Tier 4" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(5)} onTouchTap={this.checkArray.bind(this, 5, 'tier')} value={5} primaryText="Tier 5" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(6)} onTouchTap={this.checkArray.bind(this, 6, 'tier')} value={6} primaryText="Tier 6" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(7)} onTouchTap={this.checkArray.bind(this, 7, 'tier')} value={7} primaryText="Tier 7" />
								<MenuItem insetChildren={true} checked={this.state.tier.includes(8)} onTouchTap={this.checkArray.bind(this, 8, 'tier')} value={8} primaryText="Tier 8" />
							</SelectField>
					</div>
					<div className={`input-symbol ${errorClass('confirm')}`}>
						<SelectField
								name="language"
								floatingLabelText="Choose Language"
								floatingLabelFixed={true}
								value={this.state.language}
								onChange={this.onChange.bind(this, 'language')}
							>
								<MenuItem value={"none"} primaryText="Any Language" />
								<MenuItem value={"english"} primaryText="English" />
								<MenuItem value={"spanish"} primaryText="Spanish" />
								<MenuItem value={"chinese"} primaryText="Chinese" />
								<MenuItem value={"portugese"} primaryText="Portugese" />
								<MenuItem value={"other"} primaryText="Other" />
							</SelectField>
					</div>
					<div className={`input-symbol ${errorClass('confirm')}`}>
						<input
						  type="text"
						  name="mmr"
						  ref={(c) => { this.mmr = c; }}
						  placeholder={'Enter Your MMR (ex: 3252)'}
						/>
					</div>
					<div className={`input-symbol ${errorClass('confirm')}`}>
						<input
						  type="text"
						  name="bio"
						  ref={(c) => { this.bio = c; }}
						  placeholder={'Short Description of Who You Are'}
						/>
					</div>
					<button type="submit" className="btn-primary">
						Register
					</button>
				</form>

				<Link to="/signin" className="link-auth-alt">
					Already Have An Account? Login Here
				</Link>
				<hr/>
			</div>
		);

		const contentForNewUser = (
			<div className="wrapper-auth">
				<h1 className="title-auth">
					Create An Account
				</h1>
				<p className="subtitle-auth">
					Sign in with Steam to connect your accounts
				</p>
				<button onClick={this.handleClick} className="btn-primary" id="steam-login">
				</button>
			</div>
		);

		return <AuthPage content={Meteor.user() ? contentForSteamLoggedIn : contentForNewUser }/>;
	}
}

JoinPage.contextTypes = {
	router: React.PropTypes.object
};