/**
 * Card displaying a single research opportunity.
 */
export default function OpportunityCard({ opportunity, onView, onEdit, onDelete, onToggleStatus }) {
    const { id, title, research_area, department, faculty_name,
            available_positions, application_deadline, status } = opportunity;

    const isClosed = status === 'Closed';

    return (
        <div className={`card opportunity-card ${isClosed ? 'closed' : ''}`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
                    <h5 className="card-title">{title}</h5>
                    <span className={`status-badge ${isClosed ? 'closed' : 'open'}`}>
                        <span className="status-dot"></span>
                        {status}
                    </span>
                </div>

                <div className="opportunity-meta">
                    <span className="meta-pill">🔬 {research_area}</span>
                    <span className="meta-pill">🏛️ {department}</span>
                </div>

                <p className="mb-2" style={{ fontSize: '0.9rem', color: '#334155' }}>
                    👨‍🏫 {faculty_name}
                </p>

                <div className="d-flex gap-3 mb-3" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    <span>📅 {application_deadline}</span>
                    <span>🎯 {available_positions} position{available_positions !== 1 ? 's' : ''}</span>
                </div>

                <div className="card-actions">
                    <button className="btn-sm-custom btn-view" onClick={() => onView(id)}>
                        View
                    </button>
                    <button className="btn-sm-custom btn-edit" onClick={() => onEdit(opportunity)}>
                        Edit
                    </button>
                    <button
                        className={`btn-sm-custom ${isClosed ? 'btn-reopen' : 'btn-close-opp'}`}
                        onClick={() => onToggleStatus(opportunity)}
                    >
                        {isClosed ? 'Reopen' : 'Close'}
                    </button>
                    <button className="btn-sm-custom btn-delete" onClick={() => onDelete(opportunity)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}