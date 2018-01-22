import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import CreateStackPage from '../../ui/pages/CreateStackPage.jsx';
import StackInfoContainer from '../../ui/containers/StackInfoContainer.jsx';
import BattleCupPageContainer from '../../ui/containers/BattleCupPageContainer.jsx';
import StacksPageContainer from '../../ui/containers/StacksPageContainer.jsx';
import PlayerProfileContainer from '../../ui/containers/PlayerProfileContainer.jsx';

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="battlecup" component={BattleCupPageContainer} />
			<Route path="stackCreate" component={CreateStackPage} />
			<Route path="signin" component={AuthPageSignIn} />
			<Route path="join" component={AuthPageJoin} />
			<Route path="stacks" component={StacksPageContainer} />
			<Route path="stackInfo/:id" component={StackInfoContainer} />
			<Route path="playerProfile/:id" component={PlayerProfileContainer} />
		</Route>
	</Router>
);
