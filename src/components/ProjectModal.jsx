import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Project Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {function} props.onClose - Function to close the modal
 * @param {string} props.title - Title of the project
 * @param {string} props.description - Detailed description
 */
const ProjectModal = ({ isOpen, onClose, title, description }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // stopPropagation to prevent closing when clicking inside content
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={handleContentClick} role="dialog" aria-modal="true">
                <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                </div>

                <div className="modal-content">
                    <p>{description}</p>
                </div>

                <div className="modal-footer">
                    <button className="modal-action-btn" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
