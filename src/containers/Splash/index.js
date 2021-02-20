import * as PropTypes from 'prop-types';
import { MANAGER_LISTEN_URL_GET_REQ, MANAGER_START_REQ, MANAGER_START_RES } from '../../constants/channels';
import { connect } from 'react-redux';
import { isManagerRunning } from '../../utils/manager';
import { setSplashStatus } from '../../actions/splash';
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
        const { ipcRenderer } = window;
        if (ipcRenderer === undefined) {
            setSplashStatus({
                completed: 150,
                message: 'THE MANAGER IS RUNNING SUCCESSFULLY',
            });
            return;
        }

        globals.listenURL = ipcRenderer.sendSync(MANAGER_LISTEN_URL_GET_REQ);
        setSplashStatus({
            completed: 10,
            message: 'RECEIVED MANAGER LISTEN URL FROM THE MAIN PROCESS',
        });

        ipcRenderer.send(MANAGER_START_REQ);
        setSplashStatus({
            completed: 30,
            message: `STARTING THE MANAGER ON URL: ${globals.listenURL}`,
        });

        ipcRenderer.on(MANAGER_START_RES, (event, args) => {
            console.log('EVENT:', MANAGER_START_RES, 'ARGS:', args);

            if (args.success === true) {
                setSplashStatus({
                    completed: 60,
                    message: 'THE MANAGER IS STARTED SUCCESSFULLY',
                });

                isManagerRunning((error) => {
                    ipcRenderer.removeAllListeners(MANAGER_START_RES);

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
                ipcRenderer.removeAllListeners(MANAGER_START_RES);
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
