import React, { useState } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function GASelect() {
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
    const [formInput, setFormInput] = useState({
        "Knowledge Base": KB,
        "Problem Analysis": PA,
        "Investigation": I,
        "Design": D,
        "Use of Engineering Tools": ET,
        "Individual and Team Work": ITW,
        "Communication Skills": CS,
        "Professionalism": PR,
        "Impact of Engineering on Society and the Environment": IESE,
        "Ethics and Equity": EE,
        "Economics and Project Management": EPM,
        "Life-Long Learning": LL
    });

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

    const showAlert = () => {
        alert(JSON.stringify(formInput));
    };

    const handleFormInputChange = () => {
        setFormInput({
            "Knowledge Base": KB,
            "Problem Analysis": PA,
            "Investigation": I,
            "Design": D,
            "Use of Engineering Tools": ET,
            "Individual and Team Work": ITW,
            "Communication Skills": CS,
            "Professionalism": PR,
            "Impact of Engineering on Society and the Environment": IESE,
            "Ethics and Equity": EE,
            "Economics and Project Management": EPM,
            "Life-Long Learning": LL
        });
        showAlert();
    };

    const handleSubmit = (event) => {
        console.log('d');
        event.preventDefault();
        // Do something with the form data here
        handleFormInputChange();
    };

    return (
        <>
            <NavBar></NavBar>
            <div className="nav-buttons">
                <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
            </div>
            <div>
                <h1>GA Indicators</h1>
                <h2 data-attribute={"General Learning Objectives (CEAB Graduate Attributes)"}></h2>

                <div>
                    <h4>Knowledge Base</h4>
                    <select value={KB} onChange={handleKBChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Problem Analysis</h4>
                    <select value={PA} onChange={handlePAChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Investigation</h4>
                    <select value={I} onChange={handleIChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Design</h4>
                    <select value={D} onChange={handleDChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Use of Engineering Tools</h4>
                    <select value={ET} onChange={handleETChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Individual and Team Work</h4>
                    <select value={ITW} onChange={handleITWChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Communication Skills</h4>
                    <select value={CS} onChange={handleCSChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Professionalism</h4>
                    <select value={PR} onChange={handlePRChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Impact on Society and the Environment</h4>
                    <select value={IESE} onChange={handleIESEChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Ethics and Equity</h4>
                    <select value={EE} onChange={handleEEChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Economics and Project Management</h4>
                    <select value={EPM} onChange={handleEPMChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                    <h4>Life-Long Learning</h4>
                    <select value={LL} onChange={handleLLChange}>
                        <option value="">Select Learning Objective</option>
                        <option value="I">Introductory</option>
                        <option value="D">Intermediate</option>
                        <option value="A">Advanced</option>
                    </select>

                </div>

                <form onSubmit={handleSubmit}>
                    <Link to="/instructor/courses/outline/create/new" state={formInput}><button className='btn btn-success' type="submit">Submit</button></Link>
                </form>
            </div>
        </>
    );
}

export default GASelect;
