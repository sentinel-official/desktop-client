import { SPLASH_STATUS_SET } from '../constants/splash';

export const setSplashStatus = (data) => {
    return {
        type: SPLASH_STATUS_SET,
        data,
    };
};
