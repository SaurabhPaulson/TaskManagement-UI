import React from 'react';

const AIAgentPanel = ({ aiResponses, loading, error }) => {
    return (
        <div className="ai-panel">
            <h2>AI Agent Panel</h2>
            {loading && <div className="loading">Processing AI tasks...</div>}
            {(!aiResponses || Object.keys(aiResponses).length === 0) && !loading && <div className="empty">No AI responses yet.</div>}
            <ul className="ai-list">
                {aiResponses && Object.entries(aiResponses).map(([taskId, response]) => (
                    <li key={taskId} className="ai-item">
                        <span className="ai-task-id">Task {taskId}:</span> <span className="ai-response">{response}</span>
                    </li>
                ))}
            </ul>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default AIAgentPanel;