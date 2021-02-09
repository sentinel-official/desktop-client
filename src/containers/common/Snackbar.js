import { connect } from 'react-redux';
import { hideSnackbar } from '../../actions/snackbar';
import Snackbar from '../../components/Snackbar';

const stateToProps = (state) => {
    return {
        open: state.snackbar.open,
        message: state.snackbar.message,
    };
};

const actionsToProps = {
    onClose: hideSnackbar,
};

export default connect(stateToProps, actionsToProps)(Snackbar);
