import React, { useState } from 'react';

function gAForm() {
    const [KB, setKB] = useState('');
    const [PA, setPA] = useState('');
    const [I, setI] = useState('');
    const [D, setD] = useState('');
    const [ET, setET] = useState('');
    const [ITW, setITW] = useState('');
    const [CS, setCS] = useState('');
    const [PR, setPR] = useState('');
    const [IESE, setIESE] = useState('');
    const [EE, setEE] = useState('');
    const [EPM, setEPM] = useState('');
    const [LL, setLL] = useState('');
    const [formInput, setFormInput] = useState('');

    const handleKBChange = (event) => {
        setKB(event.target.value);
    };

    const handlePAChange = (event) => {
        setPA(event.target.value);
    };

    const handleIChange = (event) => {
        setI(event.target.value);
    };

    const handleDChange = (event) => {
        setD(event.target.value);
    };

    const handleETChange = (event) => {
        setET(event.target.value);
    };

    const handleITWChange = (event) => {
        setITW(event.target.value);
    };

    const handleCSChange = (event) => {
        setCS(event.target.value);
    };

    const handlePRChange = (event) => {
        setPR(event.target.value);
    };

    const handleIESEChange = (event) => {
        setIESE(event.target.value);
    };

    const handleEEChange = (event) => {
        setEE(event.target.value);
    };

    const handleEPMChange = (event) => {
        setEPM(event.target.value);
    };

    const handleLLChange = (event) => {
        setLL(event.target.value);
    };

    const handleFormInputChange = (event) => {
        setFormInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Do something with the form data here

        // Clear the form input
        setFormInput('');
    };

    return (
        <div>
            <h1>GA Indicators</h1>


            <h2 data-attribute={"General Learning Objectives (CEAB Graduate Attributes)"}></h2>

            <div>
                <select value={KB} onChange={handleKBChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={PA} onChange={handlePAChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={I} onChange={handleIChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={D} onChange={handleDChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={ET} onChange={handleETChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={ITW} onChange={handleITWChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={CS} onChange={handleCSChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={PR} onChange={handlePRChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={IESE} onChange={handleIESEChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={EE} onChange={handleEEChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={EPM} onChange={handleEPMChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

                <select value={LL} onChange={handleLLChange}>
                    <option value="">Select Learning Objective</option>
                    <option value="I">Introductory</option>
                    <option value="D">Intermediate</option>
                    <option value="A">Advanced</option>
                </select>

            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    Enter some data:
                    <input type="text" value={formInput} onChange={handleFormInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default gAForm;
