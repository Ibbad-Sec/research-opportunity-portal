/**
 * Modal showing full details of one opportunity.
 */
export default function OpportunityDetails({ opportunity, onClose }) {
    if (!opportunity) return null;

    const o = opportunity;
    const isClosed = o.status === 'Closed';

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog"
             style={{ backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
             onClick={onClose}>
            <div className="modal-dialog modal-lg modal-dialog-centered"
                 onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <h5 className="modal-title mb-2">{o.title}</h5>
                            <span className={`status-badge ${isClosed ? 'closed' : 'open'}`}>
                                <span className="status-dot"></span>
                                {o.status}
                            </span>
                        </div>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="detail-row">
                            <div className="detail-label">Description</div>
                            <div className="detail-value">{o.description}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">Research Area</div>
                            <div className="detail-value">{o.research_area}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">Faculty Member</div>
                            <div className="detail-value">{o.faculty_name}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">Department</div>
                            <div className="detail-value">{o.department}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">Required Skills</div>
                            <div className="detail-value">{o.required_skills}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">Available Positions</div>
                            <div className="detail-value">{o.available_positions}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">Application Deadline</div>
                            <div className="detail-value">{o.application_deadline}</div>
                        </div>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}