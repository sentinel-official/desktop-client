import { SPLASH_COMPLETED_SET } from '../constants/splash';

export const setSplashCompleted = (data) => {
    return {
        type: SPLASH_COMPLETED_SET,
        data,
    };
};
