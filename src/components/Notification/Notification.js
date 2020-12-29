import React from 'react';
import PropTypes from 'prop-types'

export default function Notification(message) {
    return (
        <p>{message}</p>
    );
}

Notification.propTypes = {
    message: PropTypes.string,
};
