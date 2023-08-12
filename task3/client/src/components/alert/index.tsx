import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

interface AlertProps {
    message: string;
    onClose?: () => void;
    type: 'success' | 'warning' | 'error'; // Specify the possible types of alerts
}

const Alert: React.FC<AlertProps> = ({ message, onClose, type }) => {
    return (
        <div className={`alert ${type}`}>
            <span className="close-btn" onClick={onClose}>
                &times;
            </span>
            <p>{message}</p>
        </div>
    );
};

interface ShowAlertOptions {
    message: string;
    onClose?: () => void;
    type: 'success' | 'warning' | 'error';
    time?: number;
}

export const showAlert = ({ message, onClose, type, time = 3000 }: ShowAlertOptions) => {
    const alertContainer = document.createElement('div');
    document.body.appendChild(alertContainer);

    const handleClose = () => {
        document.body.removeChild(alertContainer);
        onClose && onClose();
    };

    setTimeout(() => {
        handleClose();
    }, time);

    const root = createRoot(alertContainer);
    root.render(<Alert message={message} type={type} onClose={handleClose} />);
};
