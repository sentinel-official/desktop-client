import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isManagerRunning } from '../../utils/manager';
import { setSplashStatus } from '../../actions/splash';
import { withInterceptors } from '../../services/axios';
import Image from '../../components/Image';
import LogoWithText from '../../assets/LogoWithText.svg';
import ProgressBar from './ProgressBar';
import React, { useEffect } from 'react';
import Status from './Status';
import globals from '../../constants/globals';

const Splash = ({
    history,
    setSplashStatus,
}) => {
    useEffect(() => {
        const { electron } = window;
        if (electron === undefined) {
            withInterceptors(process.env.REACT_APP_TOKEN);
            setSplashStatus({
                completed: 150,
                message: 'THE MANAGER IS RUNNING SUCCESSFULLY',
            });
            return;
        }

        globals.listenURL = electron.sendSync.manager.listenURL();
        setSplashStatus({
            completed: 10,
            message: 'RECEIVED MANAGER LISTEN URL FROM THE MAIN PROCESS',
        });

        electron.send.manager.startRequest();
        setSplashStatus({
            completed: 30,
            message: `STARTING THE MANAGER ON URL: ${globals.listenURL}`,
        });

        electron.on.manager.startResponse((event, args) => {
            console.log('EVENT:', event, 'ARGS:', args);

            if (args.success === true) {
                withInterceptors(args.data.token);

                setSplashStatus({
                    completed: 60,
                    message: 'THE MANAGER IS STARTED SUCCESSFULLY',
                });

                isManagerRunning((error) => {
                    electron.removeAllListeners.manager.startResponse();

                    if (error) {
                        setSplashStatus({
                            completed: 100,
                            message: 'THE MANAGER IS NOT RUNNING',
                        });
                        return;
                    }

                    setSplashStatus({
                        completed: 150,
                        message: 'THE MANAGER IS RUNNING SUCCESSFULLY',
                    });
                });
            } else {
                electron.removeAllListeners.manager.startResponse();
                setSplashStatus({
                    completed: 100,
                    message: 'THE MANAGER EXITED UNEXPECTEDLY',
                });
            }
        });
    }, []);

    return (
        <div className="splash-container">
            <Image
                alt="LogoWithText"
                className="w-200"
                src={LogoWithText}
            />
            <Status/>
            <ProgressBar history={history}/>
        </div>
    );
};

Splash.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    setSplashStatus: PropTypes.func.isRequired,
};

const actionsToProps = {
    setSplashStatus,
};

export default connect(null, actionsToProps)(Splash);
