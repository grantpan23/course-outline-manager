import React, { useState } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function GAForm() {
    
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
    const [view, setView] = useState(false);
    const [formInput, setFormInput] = useState({
        "Knowledge Base": KB,
        "ProblemAnalysis": PA,
        "Investigation": I,
        "Design": D,
        "Use of Engineering Tools": ET,
        "IndividualAndTeamWork": ITW,
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

    const handleViewChange = (event) => {
        setView(true);
    }


    const {id: documentID} = useParams();


    const save = async () => {

        var quillGA = 
        [
            {"insert" : `\n\nKnowledgeBase ${KB}`},
            {"insert": `\n\nProblem Analysis ${PA}` },
            {"insert": `\n\nInvestigation ${I}`},
            {"insert": `\n\nDesign ${D}`},
            {"insert": `\n\nUse of EngineeringTools ${ET}`},
            {"insert": `\n\nIndividual And Team Work ${ITW}`},
            {"insert": `\n\nCommunication Skills ${CS}`},
            {"insert": `\n\nProfessionalism ${PR}`},
            {"insert": `\n\nImpact Of Engineering on Society and the Environment ${IESE}`},
            {"insert": `\n\nEthics And Equity ${EE}`},
            { "insert": `\n\nEconomics And Project Management ${EPM}`},
            {"insert": `\n\nLife-Long Learning ${LL}`}
        ] 

        const updateDocument = async () => {
            const document = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`);
            const data = await document.json();
            const opsList = data.ops || data
            
            console.log(opsList)
            
            let index = -1;
            for (let i = 0; i < opsList.length; i++) {
            if (opsList[i].insert === "General Learning Objectives (CEAB Graduate Attributes)") {
            index = i;
            break;
                }
            }
            console.log(index)
    
            if(quillGA.length > 0 ){
                quillGA.forEach(element => {
                    index = index + 1;
                    opsList.splice(index, 1 ,element)
                    
                });
    
            }
            
            const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opsList)
            })
    
            console.log(response)
    
            if(response.status != 200){
            console.log(response.error);
            }
            
        }

        const updateIndicators = async () => {

            var gaIndicatorList =[

                `Knowledge Base: ${KB}`
                `ProblemAnalysis: ${PA}`,
                `Investigation: ${I}`,
                `Design: ${I}`,
                `Use of Engineering Tools: ${ET}`,
                `IndividualAndTeamWork: ${ITW}`,
                `Communication Skills: ${CS}`,
                `Professionalism: ${PR}`,
                `Impact of Engineering on Society and the Environment: ${IESE}`,
                `Ethics and Equity: ${EE}`,
                `Economics and Project Management: ${EPM}`,
                `Life-Long Learning": ${LL}`
            
            
            ]

            const currentIndicators = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/ga-indicators`);
            const data = await currentIndicators.json();

            const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/ga-indicators`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gaIndicatorList)
                })
        
                console.log(response)
        
                if(response.status != 200){
                console.log(response.error);
                }



        }

        updateDocument()
        updateIndicators();
       
    }



    const handleFormInputChange = () => {
        setFormInput({
            "KnowledgeBase": KB,
            "ProblemAnalysis": PA,
            "Investigation": I,
            "Design": D,
            "Use of EngineeringTools": ET,
            "IndividualAndTeam Work": ITW,
            "CommunicationSkills": CS,
            "Professionalism": PR,
            "ImpactOfEngineering on Society and the Environment": IESE,
            "EthicsAndEquity": EE,
            "EconomicsAndProjectManagement": EPM,
            "LifeLongLearning": LL
        });
        
    };

    const handleSubmit = (event) => {
        console.log('d');
        event.preventDefault();
        handleFormInputChange();
        save();

        

            
    }


    return (
        <>
            <NavBar></NavBar>
            <div className="nav-buttons">
                <Link className="my-link" to="/instructor/courses"><button  className='btn btn-danger'>Discard</button></Link>
                <Link className="my-link" state={view} to="/instructor/courses/outline/rubric"><button onClick={handleViewChange} className='btn btn-secondary'>View Rubric</button></Link>
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

export default GAForm;
