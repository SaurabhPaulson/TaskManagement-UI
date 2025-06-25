import React, { useState } from 'react';

const TaskForm = ({ onAdd, loading }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !description) {
            setError('Title and description are required.');
            return;
        }

        try {
            await onAdd({ title, description });
            setTitle('');
            setDescription('');
        } catch (err) {
            setError('Failed to create task. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="input"
                disabled={loading}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="input"
                disabled={loading}
            />
            <button type="submit" className="btn primary" disabled={loading}>
                Add Task
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default TaskForm;