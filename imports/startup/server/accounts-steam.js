import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { to32 } from 'steam-id-convertor';
import axios from 'axios';

Accounts.onCreateUser(function (options, user) {
	// make a call to steam to get the account's name
	const steamID = user.services.steam && user.services.steam.id;
	let username;
	try {
		var result = HTTP.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=73E84A44D7F6ACE1E6ED3FBDFFFF519C&steamids="+steamID);
		console.log(result);
		username = result.data.response.players[0].personaname;
		avatar = result.data.response.players[0].avatar;
		dotaID = to32(steamID); 
	} catch (e) {
		return false;
	}
	user.playerProfile = {
		"position": options.position,
		"tier": options.tier,
		"language": options.language,
		"bio": options.bio,
		"username": username,
		"dotaID": dotaID,
		"steamID": steamID,
		"avatar": avatar,
	};

	try{	
		let deaths = 0;
		let assists = 0;
		let kills = 0;
		let gold_per_min = 0;
		let last_hits = 0;
		let wins = 0;
		let losses = 0;
		let openDotaMmr = 0;

		let result = HTTP.get('https://api.opendota.com/api/players/' + dotaID + '/recentMatches');
			const matches = result.data;
			const matchLength = matches.length;
			if(matchLength != 0){
				for( let i = 0; i < matchLength; i++){
					deaths += matches[i].deaths / matchLength;
					assists += matches[i].assists / matchLength;
					kills += matches[i].kills / matchLength;
					gold_per_min += matches[i].gold_per_min / matchLength;
					last_hits += matches[i].last_hits / matchLength;
				}

				deaths = Math.round(deaths * 100) / 100;
				assists = Math.round(assists * 100) / 100;
				kills = Math.round(kills * 100) / 100;
				gold_per_min = Math.round(gold_per_min * 100) / 100;
				last_hits = Math.round(last_hits * 100) / 100;
			}

		let result2 = HTTP.get('https://api.opendota.com/api/players/' + dotaID + '/wl/?limit=20')
		wins = result2.data.win;
		losses = result2.data.lose;

		let result3 = HTTP.get('https://api.opendota.com/api/players/' + dotaID)
		openDotaMmr = result3.data.solo_competitive_rank;

		user.playerStats = {
			"kills": kills,
			"deaths": deaths,
			"assists": assists,
			"gpm": gold_per_min,
			"lastHits": last_hits,
			"wins": wins,
			"losses": losses,
			"openDotaMmr": openDotaMmr,
		}
		return user;
	}
	catch(e){
		return false;
	}

});