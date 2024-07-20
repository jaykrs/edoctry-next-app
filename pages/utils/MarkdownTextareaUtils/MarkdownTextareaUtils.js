// MarkdownEditor.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownEditor = (props) => {
    const {model="",setModel=(()=>{}),title=""} = props;
    const handleTextareaChange = (event) => {
        setModel(event.target.value);
    };
    return (
        <div>
            <div class="d-flex justify-content-between">
                <h3 className='markdownTextareaTlt'>{title}</h3>
                <button type="button" class="position-relative markdownBtn" data-bs-toggle="modal" data-bs-target="#markdownModel">
                    Preview
                </button>
            </div>
            <textarea
                rows={10}
                value={model}
                onChange={handleTextareaChange}
                placeholder="Enter Markdown text here..."
                className='markdownTextarea'
            />
            <div style={{ marginTop: '10px' }}>

            </div>

            <div class="modal fade" id="markdownModel" tabindex="-1" aria-labelledby="markdownModelLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        
                        <div class="modal-body">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{model}</ReactMarkdown>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MarkdownEditor;
