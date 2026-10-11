/**
 * Main application component for the Research Opportunity Portal.
 */
import { useEffect, useState } from 'react';
import Alert from './components/Alert';
import OpportunityForm from './components/OpportunityForm';
import OpportunityCard from './components/OpportunityCard';
import OpportunityDetails from './components/OpportunityDetails';
import { opportunityService } from './services/opportunities';
import './App.css';

export default function App() {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [editing, setEditing] = useState(null);
    const [viewing, setViewing] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert({ type: '', message: '' }), 4000);
    };

    const loadOpportunities = async () => {
        setLoading(true);
        try {
            const data = await opportunityService.getAll();
            setOpportunities(data);
        } catch (err) {
            showAlert('danger', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOpportunities();
    }, []);

    const handleSubmit = async (payload) => {
        setSubmitting(true);
        try {
            if (editing) {
                await opportunityService.update(editing.id, payload);
                showAlert('success', 'Opportunity updated successfully.');
                setEditing(null);
            } else {
                await opportunityService.create(payload);
                showAlert('success', 'Opportunity created successfully.');
            }
            await loadOpportunities();
        } catch (err) {
            showAlert('danger', err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (opp) => {
        if (!window.confirm(`Delete "${opp.title}"?`)) return;
        try {
            await opportunityService.remove(opp.id);
            showAlert('success', 'Opportunity deleted.');
            await loadOpportunities();
        } catch (err) {
            showAlert('danger', err.message);
        }
    };

    const handleToggleStatus = async (opp) => {
        const newStatus = opp.status === 'Open' ? 'Closed' : 'Open';
        try {
            await opportunityService.update(opp.id, { status: newStatus });
            showAlert('success', `Status changed to ${newStatus}.`);
            await loadOpportunities();
        } catch (err) {
            showAlert('danger', err.message);
        }
    };

    const handleView = async (id) => {
        try {
            const data = await opportunityService.getById(id);
            setViewing(data);
        } catch (err) {
            showAlert('danger', err.message);
        }
    };

    const filtered = opportunities.filter((o) => {
        const q = searchTerm.toLowerCase();
        return (
            o.title.toLowerCase().includes(q) ||
            o.research_area.toLowerCase().includes(q) ||
            o.faculty_name.toLowerCase().includes(q) ||
            o.department.toLowerCase().includes(q)
        );
    });

    const openCount = opportunities.filter((o) => o.status === 'Open').length;
    const closedCount = opportunities.filter((o) => o.status === 'Closed').length;

    return (
        <div className="container py-4" style={{ maxWidth: '1200px' }}>
            {/* Hero */}
            <header className="hero">
                <div className="hero-content">
                    <span className="hero-badge">🎓 University Portal</span>
                    <h1>Research Opportunity Portal</h1>
                    <p>Discover, post, and manage research opportunities — all in one place.</p>

                    {opportunities.length > 0 && (
                        <div className="d-flex gap-3 mt-4 flex-wrap">
                            <div className="meta-pill" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                📋 {opportunities.length} Total
                            </div>
                            <div className="meta-pill" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                ✅ {openCount} Open
                            </div>
                            <div className="meta-pill" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                🔒 {closedCount} Closed
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Alert */}
            <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ type: '', message: '' })}
            />

            {/* Form */}
            <OpportunityForm
                editing={editing}
                onSubmit={handleSubmit}
                onCancel={() => setEditing(null)}
                submitting={submitting}
            />

            {/* Search + Refresh */}
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by title, area, faculty, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn-refresh" onClick={loadOpportunities}>
                    🔄 Refresh
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="spinner-wrap">
                    <div className="spinner"></div>
                </div>
            ) : filtered.length === 0 ? (
                <EmptyState hasSearch={Boolean(searchTerm)} />
            ) : (
                <div className="row g-3">
                    {filtered.map((o) => (
                        <div className="col-md-6 col-lg-4" key={o.id}>
                            <OpportunityCard
                                opportunity={o}
                                onView={handleView}
                                onEdit={setEditing}
                                onDelete={handleDelete}
                                onToggleStatus={handleToggleStatus}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Details modal */}
            {viewing && (
                <OpportunityDetails opportunity={viewing} onClose={() => setViewing(null)} />
            )}
        </div>
    );
}

/* Inline empty state component */
function EmptyState({ hasSearch }) {
    return (
        <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>{hasSearch ? 'No matches found' : 'No opportunities yet'}</h4>
            <p>{hasSearch
                ? 'Try a different search term.'
                : 'Create the first opportunity using the form above.'}
            </p>
        </div>
    );
}