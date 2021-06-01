import Configuration from './pages/Configuration';
import CreateKey from './pages/CreateKey';
import KeyInfo from './pages/KeyInfo';
import Splash from './pages/Splash';
import Wallet from './pages/Wallet';

const routes = [{
    path: '/',
    component: Splash,
}, {
    path: '/configuration',
    component: Configuration,
}, {
    path: '/keys',
    component: CreateKey,
}, {
    path: '/keys/:name',
    component: KeyInfo,
}, {
    path: '/dashboard/wallet',
    component: Wallet,
}];

export default routes;
