import { SIDE_BAR_CONTENT_SHOW, SIDEBAR_DRAWER_TOGGLE, SIDEBAR_SELECTED_TAB_SET } from '../constants/sidebar';

export const toggleSidebarDrawer = () => {
    return {
        type: SIDEBAR_DRAWER_TOGGLE,
    };
};

export const setSidebarSelectedTab = (url, index) => {
    return {
        type: SIDEBAR_SELECTED_TAB_SET,
        url,
        index,
    };
};

export const updateSidebarContent = (value) => {
    return {
        type: SIDE_BAR_CONTENT_SHOW,
        value,
    };
};
