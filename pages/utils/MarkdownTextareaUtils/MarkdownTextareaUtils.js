// MarkdownEditor.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownEditor = ({ model = "", setModel, title = "", required = false }) => {
    const [showModal, setShowModal] = useState(false); // Track modal visibility

    const handleTextareaChange = (event) => {
        setModel(event.target.value);
    };

    const handlePreviewClick = () => {
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h3 className='markdownTextareaTlt'>
                    <strong>{title}</strong>
                    <span className="mandatoryField" style={{ display: required === true ? "" : "none" }}>*</span>
                </h3>
                <button
                    type="button"
                    className="position-relative markdownBtn"
                    onClick={handlePreviewClick} // Use the React method to show modal
                >
                    Preview
                </button>
            </div>
            <textarea
                rows={10}
                value={model}
                onChange={handleTextareaChange}
                placeholder="Enter Markdown text here..."
                className="markdownTextarea"
            />

            {/* Modal is controlled by React state */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="markdownModelLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-body">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{model}</ReactMarkdown>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarkdownEditor;
