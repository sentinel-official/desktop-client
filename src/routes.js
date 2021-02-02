import AccountCreation from './pages/AccountCreation';
import AccountDetails from './pages/AccountDetails';
import Authentication from './pages/Authentication';
import Configuration from './pages/Configuration';
import Splash from './pages/Splash';

export const unauthenticated = [{
    path: '/',
    component: Splash,
}, {
    path: '/authentication',
    component: Authentication,
}];

export const authenticated = [{
    path: '/configuration',
    component: Configuration,
}, {
    path: '/keys',
    component: AccountCreation,
}, {
    path: '/keys/:name',
    component: AccountDetails,
}];
