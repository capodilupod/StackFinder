import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import axios from 'axios';
import { Accounts } from 'meteor/accounts-base';

export const updatePlayer = new ValidatedMethod({
	name: 'players.update',
	validate: new SimpleSchema({
		battlecup: { type: Boolean, optional: true  },
		lookingForMore: { type: Boolean, optional: true },
		email: { type: SimpleSchema.RegEx.Email, optional: true },
		password: { type: String, optional: true },
		position: { type: [Number], optional: true },
		tier: { type: [Number], optional: true }, 
		language: { type: String , optional: true },
		bio: { type: String, optional: true },
		teamId: {type: String, optional: true },
		mmr: { type: Number, optional: true },
	}).validator(),
	run( { email, password, position, tier, language, bio, battlecup, lookingForMore, mmr, teamId }) {
		if (!this.userId) {
			throw new Meteor.Error('api.players.update',
				'Cannot modify a non logged in user');
		}
	
		// only update fields that aren't undefined
		let updateObject = {
			"playerProfile.position": position,
			"playerProfile.tier": tier,
			"playerProfile.language": language,
			"playerProfile.bio": bio,
			"playerProfile.battlecup": battlecup,
			"playerProfile.lookingForMore": lookingForMore,
			"playerProfile.mmr": mmr,
			"playerProfile.teamId": teamId,
		};

		Object.getOwnPropertyNames(updateObject).forEach(function (prop) {
			if (updateObject[prop] === undefined) {
				delete updateObject[prop];
			}
		});

		if (!this.isSimulation) {
			if(email && password) {
				Accounts.addEmail(this.userId, email);
				Accounts.setPassword(this.userId, password, {logout: false} );
			}	
		}

		Meteor.users.update({_id: this.userId}, {$set: updateObject})
	},
});




export default updatePlayer;