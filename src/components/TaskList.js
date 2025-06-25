import React, { useState } from 'react';

const groupByStatus = (tasks) => {
    const groups = { pending: [], ongoing: [], completed: [] };
    tasks.forEach(task => {
        const status = (task.status || 'pending').toLowerCase();
        if (groups[status]) groups[status].push(task);
        else groups.pending.push(task);
    });
    return groups;
};

const TaskList = ({
    tasks = [],
    onUpdate,
    onDelete,
    onAssignAI,
    aiResponses = {},
    loading
}) => {
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const startEdit = task => {
        setEditId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleUpdate = id => {
        if (editTitle && editDescription) {
            onUpdate(id, { title: editTitle, description: editDescription });
        }
        setEditId(null);
    };

    if (!tasks.length) return <div className="empty">No tasks yet.</div>;

    const grouped = groupByStatus(tasks);

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            {['pending', 'ongoing', 'completed'].map(status => (
                <div key={status}>
                    <h3 style={{ marginTop: 18 }}>{status.charAt(0).toUpperCase() + status.slice(1)} Tasks</h3>
                    <ul className="task-list">
                        {grouped[status].length === 0 && <li className="empty">No {status} tasks.</li>}
                        {grouped[status].map(task => (
                            <li key={task.id} className="task-item">
                                {editId === task.id ? (
                                    <div className="edit-row">
                                        <input
                                            value={editTitle}
                                            onChange={e => setEditTitle(e.target.value)}
                                            className="input"
                                        />
                                        <input
                                            value={editDescription}
                                            onChange={e => setEditDescription(e.target.value)}
                                            className="input"
                                        />
                                        <button onClick={() => handleUpdate(task.id)} className="btn success" disabled={loading}>Save</button>
                                        <button onClick={() => setEditId(null)} className="btn" disabled={loading}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="task-row">
                                        <div>
                                            <strong>{task.title}</strong> - {task.description}
                                        </div>
                                        <div className="task-actions">
                                            <button onClick={() => startEdit(task)} className="btn" disabled={loading}>Edit</button>
                                            <button onClick={() => onDelete(task.id)} className="btn danger" disabled={loading}>Delete</button>
                                            <button onClick={() => onAssignAI(task.id)} className="btn info" disabled={loading}>
                                                Assign to AI
                                            </button>
                                        </div>
                                        {aiResponses && aiResponses[task.id] && (
                                            <div className="ai-response">
                                                AI: {aiResponses[task.id]}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TaskList;