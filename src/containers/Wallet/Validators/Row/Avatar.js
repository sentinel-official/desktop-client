import * as PropTypes from 'prop-types';
import Axios from 'axios';
import Image from '../../../../components/Image';
import Profile from '../../../../assets/Profile.svg';
import React, { useEffect, useState } from 'react';
import cache from '../../../../constants/cache';

const Avatar = ({ identity }) => {
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        if (identity === '') {
            setAvatarURL('');
            return;
        }

        if (cache.validators.avatars[identity]) {
            setAvatarURL(cache.validators.avatars[identity]);
            return;
        }

        const url = 'https://keybase.io/_/api/1.0/user/lookup.json' +
            `?key_suffix=${identity}&fields=pictures`;

        Axios.get(url)
            .then((res) => {
                const url = res?.data?.them[0]?.pictures?.primary?.url;
                if (url) {
                    cache.validators.avatars[identity] = url;
                    setAvatarURL(url);
                }
            })
            .catch(console.error);
    }, [identity]);

    return (
        <Image
            alt="moniker-image"
            className="moniker-image"
            src={avatarURL || Profile}
        />
    );
};

Avatar.propTypes = {
    identity: PropTypes.string.isRequired,
};

export default Avatar;
