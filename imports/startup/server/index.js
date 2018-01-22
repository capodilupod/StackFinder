// This file configures the Accounts Package on steam registration to fetch stuff from the steam API
import './accounts-steam.js';
//import './fixtures.js';
// maybe refactor this out if needed
// register all the apis
import '../../api/players/server/publications.js';
import '../../api/players/methods.js';
import '../../api/stacks/server/publications.js';
import '../../api/stacks/stacks.js';
import '../../api/stacks/methods.js';

Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
      { service: 'steam' },
      {
        $set: {
          loginStyle: 'redirect', // THIS MUST BE SET TO REDIRECT
          timeout: 10000          // 10 seconds
        }
      }
    );
  });
