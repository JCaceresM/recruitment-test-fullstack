import React, { ReactNode } from 'react';
import './styles.css';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    onAccept: (e: MouseEvent) => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
    title,
    isOpen,
    onClose,
    children,
    onAccept,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="modal-content">{children}</div>
                <div className="modal-footer">
                    <button className="accept-button" onClick={(e: any) => onAccept(e)}>
                        Aceptar
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
