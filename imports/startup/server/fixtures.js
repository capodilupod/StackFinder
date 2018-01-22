import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Stacks } from '../../api/stacks/stacks.js'


// if the database is empty on startup, create some sample data
Meteor.startup(() => {
	if (Meteor.users.find().count() < 2) {
		const data = [
			{
				"playerProfile": {
					"position": [1],
					"tier": [5],
					"language": "english",
					"bio": "poop",
					"username": "chances make champioons",
					"battlecup": true,
					"lookingForMore": false,
				},
				"playerStats": {
					"kills": 10,
					"deaths": 9,
					"assists": 8,
					"gpm": 420,
					"lastHits": 150,
					"wins": 8,
					"losses": 12,
					"openDotaMmr": 2750,
				}
			},
			{
				"playerProfile": {
					"position": [2],
					"tier": [4],
					"language": "english",
					"bio": "ez mid",
					"username": "noobs r us",
					"battlecup": true,
					"lookingForMore": true,
				},
				"playerStats": {
					"kills": 10,
					"deaths": 9,
					"assists": 8,
					"gpm": 420,
					"lastHits": 150,
					"wins": 8,
					"losses": 12,
					"openDotaMmr": 2750,
				}
			},
			{
				"playerProfile": {
					"position": [1],
					"tier": [5],
					"language": "english",
					"bio": "gg",
					"username": "ez",
					"battlecup": true,
					"lookingForMore": true,
				},
				"playerStats": {
					"kills": 10,
					"deaths": 9,
					"assists": 8,
					"gpm": 420,
					"lastHits": 150,
					"wins": 8,
					"losses": 12,
					"openDotaMmr": 2750,
				}
			},
			{
				"playerProfile":{
					"position": [3],
					"tier": [5],
					"language": "english",
					"bio": "end",
					"username": "purepwnage",
					"battlecup": true,
					"lookingForMore": true,
				},
				"playerStats": {
					"kills": 10,
					"deaths": 9,
					"assists": 8,
					"gpm": 420,
					"lastHits": 150,
					"wins": 8,
					"losses": 12,
					"openDotaMmr": 2750,
				}
			},
			{
				"playerProfile":{
					"position": [2],
					"tier": [3],
					"language": "spanish",
					"bio": "i suck",
					"username": "teh_pwnerer",
					"battlecup": true,
					"lookingForMore": true,
				},
				"playerStats": {
					"kills": 10,
					"deaths": 9,
					"assists": 8,
					"gpm": 420,
					"lastHits": 150,
					"wins": 8,
					"losses": 12,
					"openDotaMmr": 2750,
				}
			},
			{
				"playerProfile": {
					"position": [1],
					"tier": [7],
					"language":"chinese",
					"bio": "still suck",
					"username": "fps_doug",
					"battlecup": true,
					"lookingForMore": true,
				},
				"playerStats": {
					"kills": 10,
					"deaths": 9,
					"assists": 8,
					"gpm": 420,
					"lastHits": 150,
					"wins": 8,
					"losses": 12,
					"openDotaMmr": 2750,
				}
			},

		];

		data.forEach((player) => {
			console.log(player);
			Meteor.users.insert({
				username: player.playerProfile.username,
				password: "test",
				playerProfile: player.playerProfile,
				playerStats: player.playerStats,
			});
		});
	}

	const stackData = [
		{
			"stackName": "stack 1",
			"description": "this is stack 1",
			"roster": [{ "id": "kGkJTfPxsAvR9o4wR", "username": "noobs r us"}],
			"captain": "kGkJTfPxsAvR9o4wR",
			"joinRequests": [],

		},
	];
	if(Stacks.find().count() < 1){
		stackData.forEach((stack) => {
			Stacks.insert({
				stackName: stack.stackName,
				description: stack.description,
				roster: stack.roster,
				captain: stack.captain,
				joinRequests: stack.joinRequests

			});
		});
	}
});