import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { HTTP } from 'meteor/http';
import { Stacks } from './stacks.js';

export const createStack = new ValidatedMethod({
	name: 'stacks.create',
	validate: new SimpleSchema({
		stackName: { type: String },
		description: { type: String }
	}).validator(),
	run({ stackName, description }){
		if(!this.userId){
			throw new Meteor.Error('api.stacks.create',
				'Must be logged in to create a team');
		}
		//get current userName and make object to query with
		const currentUser = Meteor.users.find({ _id: this.userId }).fetch();
		const currentUserName = currentUser[0].playerProfile.username;
		let currentUserObject = {"id": this.userId, "name": currentUserName };

		//check if user on team already
		const alreadyOnTeam = Stacks.findOne({ roster: { $in: [currentUserObject] }});

		if(!alreadyOnTeam){
			const playerCursor = Meteor.users.find({_id: this.userId}).fetch();
			const username = playerCursor[0].playerProfile.username;
			const teamMember = {id: this.userId, name: username}

			let newTeamId;
			Stacks.insert({ 
					stackName: stackName,
					description: description,
					captain: this.userId,
					roster: [teamMember],
					joinRequests: [],
				}, function(err, _id){
					newTeamId = _id;
					Meteor.users.update({_id: Meteor.userId()}, {$set: {
						"playerProfile.teamId": newTeamId,
						"playerProfile.battlecup": false,
					}});
				});
			}
		else{
			throw new Meteor.Error('api.stack.alreadyOnTeam',
					'user is already on a team');
		}
		}
});

export const addPlayerToStack = new ValidatedMethod({
	name: 'stacks.addplayer',
	validate: new SimpleSchema({
		userId: { type: String },
		username: {type: String },
		invite: { type: Boolean, optional: true},
	}).validator(),
	run({ userId, username, invite }){
		//check if person adding is captain on a team, otherwise shouldnt be able to add
		//(can add additional adding of people later)
		let isCaptain = Stacks.find({captain: this.userId}).fetch();
		let user = Meteor.users.find({_id: userId}).fetch();
		let userInvites = user[0].playerProfile.invites;
		let teamId = isCaptain[0]._id;
		let teamName = isCaptain[0].stackName;
		let inviteRequest = { id: teamId, name: teamName, new: true};

		if(isCaptain && !invite){
			let teamMember = {id: userId, name: username};
			Stacks.update({ captain: this.userId }, { $push: {roster: teamMember }});
			Meteor.users.update({ _id: userId}, { $set: {
				"playerProfile.teamId": teamId,
				"playerProfile.battlecup": false,
			}});
			Stacks.update({ _id: teamId }, { $pull: {joinRequests: teamMember }});
		}
		else if(isCaptain && invite){
			//loop to check objects if there are any invites, else just add
			console.log('al;sdf');
			console.log(userInvites);
			if(userInvites){
				for(let i = 0; i < userInvites.length; i++){
					if(userInvites[i].id == teamId){
						throw new Meteor.Error('api.stack.addPlayerToStack',
								'You have already invited this player to your stack');
						return;
					}
				}
			}
			Meteor.users.update({ _id: userId}, { $push: {
						"playerProfile.invites": inviteRequest,
				}});
		}
		else{
			throw new Meteor.Error('api.stack.addPlayerToStack',
				'You must be on a team and the Captain to add players to a team');
		}

	}
});

export const removePlayer = new ValidatedMethod({
	name: 'stack.removePlayer',
	validate: new SimpleSchema({
		userToRemoveId: { type: String },
		userToRemoveName: {type: String },
		teamId: {type: String },
	}).validator(),
	run({ userToRemoveId, userToRemoveName, teamId }){
		//assert the person that is kicking another player is the captain
		let isCaptain = Stacks.find({captain: this.userId}).fetch();
		let userToRemoveObject = { "id": userToRemoveId, "name": userToRemoveName }; 

		if(isCaptain[0] && isCaptain[0].captain == userToRemoveId){
			throw new Meteor.Error('api.stack.addPlayerToStack',
				'You must make someone else the captain before removing yourself from the team')
		}

		let userToRemove = Meteor.users.find({ _id: userToRemove }).fetch();
		Stacks.update({ _id: teamId }, { $pull: {roster: userToRemoveObject }});
		Meteor.users.update({ _id: userToRemoveId }, { $set: { 
			"playerProfile.teamId": null,
			"playerProfile.battlecup": true
		}});

		
	}
});

export const makeCaptain = new ValidatedMethod({
	name: 'stack.makeCaptain',
	validate: new SimpleSchema({
		teamId: { type: String },
		newCaptainId: { type: String },
	}).validator(),
	run({ teamId, newCaptainId }){
		Stacks.update({ _id: teamId}, {$set : {captain: newCaptainId }});
	}
});

export const deleteTeam = new ValidatedMethod({
	name: 'stack.deleteTeam',
	validate: new SimpleSchema({
		teamId: { type: String },
	}).validator(),
	run({ teamId }){
		let stack = Stacks.find({ _id: teamId }).fetch();
		if(stack[0].roster.length == 1){
			Meteor.users.update({ _id: Meteor.userId() }, { $set: { 
				"playerProfile.teamId": null,
				"playerProfile.battlecup": true
			}});
			Stacks.remove({ _id: teamId });
		}
		else{
			throw new Meteor.Error('api.stack.deleteTeam',
				'You must remove everyone from the team before deleting the team');
		}

	}
});

export const getBattleCupData = new ValidatedMethod({
	name: 'stack.getBattleCupData',
	validate: new SimpleSchema({
		players: { type: [String] },
	}).validator(),
	run({ players }){
		console.log(players);
		let params = "";
		if(players.length > 1){
			for(let i = 1; i < players.length; i++){
			params = params.concat("&=" + players[i]);
			}
			console.log(params);
			console.log(players[0]);
			let query = "https://api.opendota.com/api/players/" + players[0] + "/matches/?lobby_type=9&included_account_id=";
			console.log(query);
		}
		else if(players.length == 1){
			let query = "https://api.opendota.com/api/players/" + players[0] + "/matches/?lobby_type=9";
			console.log(query);
		}
		else{
			let query = "";
		}
		
	}
});

export const updateNotifications = new ValidatedMethod({
	name: 'stack.updateNotifications',
	validate: new SimpleSchema({
		id: { type: String, optional: true }
	}).validator(),
	run({ id }){
		let user = Meteor.users.findOne({ _id: Meteor.userId()});
		let invites = user.playerProfile.invites;
		let index;
		for(let i = 0; i < invites.length; i++){
				invites[i].new = false;
			
		}
		Meteor.users.update({ _id: Meteor.userId()}, { $set: {
				"playerProfile.invites": invites,
			}});
	}
});

export const acceptJoinInvite = new ValidatedMethod({
	name: 'stack.acceptJoinRequest',
	validate: new SimpleSchema({
		stackId: { type: String },
		stackName: { type: String },
		newUsername: { type: String },
	}).validator(),
	run({ stackId, stackName, newUsername }){
		const teamMember = {id: Meteor.userId(), name: newUsername};
		Stacks.update({ _id: stackId }, { $push: {roster: teamMember }});

		let inviteRequest = { id: stackId, name: stackName, new: false};
		console.log(inviteRequest);
		Meteor.users.update({ _id: Meteor.userId() }, { $set: { 
				"playerProfile.teamId": stackId,
				"playerProfile.battlecup": false
				}});
		//remove the invite
		Meteor.users.update({ _id: Meteor.userId() }, { $pull: { "playerProfile.invites": inviteRequest }});


	}
});

export const requestToJoin = new ValidatedMethod({
	name: 'stack.requestjoin',
	validate: new SimpleSchema({
		userToAddId: { type: String },
		teamId: { type: String },
	}).validator(),
	run({ userToAddId, teamId }){

		let user = Meteor.users.find({ _id: userToAddId }).fetch();
		let userCurrentTeam = user[0].playerProfile.teamId;
		let userCurrentName = user[0].playerProfile.username;

		let userToAddObject = {"id": userToAddId, "name": userCurrentName};

		if(userCurrentTeam == null){
			Stacks.update({ _id: teamId }, { $push: { joinRequests: userToAddObject }});
		}
		else{
			throw new Meteor.Error('api.stack.requestToJoin',
				'You can not request to join a team when you are already on one');
		}
	}

});










