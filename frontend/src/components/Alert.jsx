/**
 * Simple dismissible alert for success/error messages.
 */
export default function Alert({ type = 'info', message, onClose }) {
    if (!message) return null;

    const icons = {
        success: '✅',
        danger: '❌',
        warning: '⚠️',
        info: 'ℹ️',
    };

    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            <span className="me-2">{icons[type] || ''}</span>
            {message}
            <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
            ></button>
        </div>
    );
}