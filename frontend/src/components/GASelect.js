import React, { useState } from 'react';
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
    const [formInput, setFormInput] = useState({
        "KnowledgeBase": KB,
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

    const showAlert = () => {
        alert(JSON.stringify(formInput));
      };

    const {id: documentID} = useParams();

    const save = async () => {

        var quillGA = 
        [
            {"insert" : `KnowledgeBase ${KB}`},
            {"insert": `\n\nProblem Analysis ${PA}`},
            {"insert": `\n\nInvestigation ${I}`},
            {"insert": `\n\nDesign ${D}`},
            {"insert": `\n\nUse of EngineeringTools ${ET}`},
            {"insert": `\n\nIndividual And Team Work ${ITW}`},
            {"insert": `\n\nCommunication Skills ${CS}`},
            {"insert": `\n\nProfessionalism ${PR}`},
            {"insert": `\n\nImpactOfEngineering on Society and the Environment ${IESE}`},
            {"insert": `\n\nEthicsAndEquity ${EE}`},
            { "insert": `\n\nEconomicsAndProjectManagement ${EPM}`},
            {"insert": `\n\nLife-Long Learning ${LL}`}
    ]
            
        
            const existingDoc = async () => {
            const document = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`);
            const data = await document.json();
            
            console.log(data)
            const opsList = data.ops || data

            
            //opsList.push(quillGA)
            
            if(quillGA.length > 0 ){
                quillGA.forEach(element => {
                    opsList.push(element)
                });

            }
            

            
            console.log(JSON.stringify(opsList))
            
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
        existingDoc()
        //"insert" : `KnowledgeBase ${KB}`,
        // "insert": `Investigation ${I}`,
        // "insert": `Design ${D}`,
        // "insert": `Use of EngineeringTools ${ET}`,
        // "insert": `Individual And Team Work ${ITW}`,
        // "insert": `Communication Skills ${CS}`,
        // "insert": `Professionalism ${PR}`,
        // "insert": `ImpactOfEngineering on Society and the Environment ${IESE}`,
        // "insert": `EthicsAndEquity ${EE}`,
        // "insert": `EconomicsAndProjectManagement ${EPM}`,
        // "insert": `Life-Long Learning ${LL}`
       
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
        event.preventDefault();
        handleFormInputChange();
        save();

        

            
    }


    return (
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default GAForm;
