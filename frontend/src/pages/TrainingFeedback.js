import React, { useState } from 'react';

function TrainingFeedback() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        console.log('Feedback submitted:', feedback);
        setFeedback('');
    };

    return (
        <div className="container mt-4">
            <h1>Training Feedback</h1>
            <div className="mb-3">
                <label className="form-label">Your Feedback</label>
                <textarea
                    className="form-control"
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
            </div>
            <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default TrainingFeedback;
