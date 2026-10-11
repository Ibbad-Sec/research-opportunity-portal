/**
 * Form for creating or editing an opportunity.
 */
import { useEffect, useState } from 'react';

const EMPTY_FORM = {
    title: '',
    description: '',
    research_area: '',
    faculty_name: '',
    department: '',
    required_skills: '',
    available_positions: 1,
    application_deadline: '',
    status: 'Open',
};

export default function OpportunityForm({ editing, onSubmit, onCancel, submitting }) {
    const [form, setForm] = useState(EMPTY_FORM);

    useEffect(() => {
        if (editing) {
            setForm({
                title: editing.title || '',
                description: editing.description || '',
                research_area: editing.research_area || '',
                faculty_name: editing.faculty_name || '',
                department: editing.department || '',
                required_skills: editing.required_skills || '',
                available_positions: editing.available_positions || 1,
                application_deadline: (editing.application_deadline || '').slice(0, 10),
                status: editing.status || 'Open',
            });
        } else {
            setForm(EMPTY_FORM);
        }
    }, [editing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            available_positions: parseInt(form.available_positions, 10) || 1,
        };
        onSubmit(payload);
    };

    const isEditing = Boolean(editing);

    return (
        <div className="card form-card">
            <div className="card-header">
                <h5 className="mb-0">
                    {isEditing ? '✏️ Edit Opportunity' : '➕ Create New Opportunity'}
                </h5>
            </div>
            <div className="card-body p-0">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Title *</label>
                            <input type="text" name="title" className="form-control"
                                value={form.title} onChange={handleChange}
                                placeholder="e.g. AI for Healthcare Diagnostics" required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Research Area *</label>
                            <input type="text" name="research_area" className="form-control"
                                value={form.research_area} onChange={handleChange}
                                placeholder="e.g. Artificial Intelligence" required />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Description *</label>
                            <textarea name="description" className="form-control" rows="2"
                                value={form.description} onChange={handleChange}
                                placeholder="Briefly describe the research project..." required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Faculty Name *</label>
                            <input type="text" name="faculty_name" className="form-control"
                                value={form.faculty_name} onChange={handleChange}
                                placeholder="e.g. Dr. Ayesha Khan" required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Department *</label>
                            <input type="text" name="department" className="form-control"
                                value={form.department} onChange={handleChange}
                                placeholder="e.g. Computer Science" required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Required Skills *</label>
                            <input type="text" name="required_skills" className="form-control"
                                value={form.required_skills} onChange={handleChange}
                                placeholder="e.g. Python, TensorFlow, Data Analysis" required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Positions *</label>
                            <input type="number" name="available_positions" className="form-control"
                                min="1" value={form.available_positions} onChange={handleChange} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Deadline *</label>
                            <input type="date" name="application_deadline" className="form-control"
                                value={form.application_deadline} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mt-4 d-flex gap-2">
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? '⏳ Saving...' : (isEditing ? '💾 Update' : '✨ Create')}
                        </button>
                        {isEditing && (
                            <button type="button" className="btn btn-secondary"
                                onClick={onCancel} disabled={submitting}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}