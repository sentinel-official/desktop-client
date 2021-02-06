import Authentication from './pages/Authentication';
import Configuration from './pages/Configuration';
import CreateKey from './pages/CreateKey';
import KeyInfo from './pages/KeyInfo';
import Splash from './pages/Wallet';

const routes = [{
    path: '/',
    component: Splash,
    private: false,
}, {
    path: '/authentication',
    component: Authentication,
    private: false,
}, {
    path: '/configuration',
    component: Configuration,
    private: false,
}, {
    path: '/keys',
    component: CreateKey,
    private: false,
}, {
    path: '/keys/:name',
    component: KeyInfo,
    private: false,
}];

export default routes;
