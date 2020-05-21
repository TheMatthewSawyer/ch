import React from 'react';
import images from '../../images';
const axios = require('axios');

function Candidate(props) {
    const setPage = props.setPage;

    React.useEffect(function () {
        getProfile();
    });
    const email = `${window.btoa('email')}`
    const usrEmail = window.atob(localStorage.getItem(`${email}`));
    const getProfile = async () => {
        const response = await axios
            .post('/api/profile', {
                email: usrEmail,
            })
            .then(function (res) {
                return res;
            })
        if (response.data === null) {
            setPage('CreateProfile');
            return;
        }
        
        // city: "Nowhere"
        // date: "2020-05-20T21:05:43.872Z"
        // description: "This is description one."
        // email: "testapplicant1@test.com"
        // firstName: "FirstOne"
        // lastName: "LastOne"
        // profileBackground: 1
        // profileImg: "defaultImage"
        // testResults: "Human Resources"
        // website: "https://www.google.com"
        // willMove: false
        document.getElementById('usrDescription').innerHTML = `${response.data.description}`;
        document.getElementById('usrName').innerHTML = `${response.data.firstName} ${response.data.lastName}`;
        document.getElementById('testResults').innerHTML = `${response.data.testResults}`;
        var willMove;
        if (`${response.data.willMove}`) {
            willMove = 'Willing to move';
        } else {
            willMove = 'Local only';
        }
        if (`${response.data.profileImg}` === "defaultImage") {
            console.log('default');
        } else {
            document.getElementById('profPic').src = `${response.data.profileImg}`;
        }
        document.getElementById('usrCity').innerHTML = `${response.data.city} ••• ${willMove}`;
        document.getElementById('usrWeb').innerHTML = `${response.data.website}`;
        document.getElementById('usrWeb').href = `${response.data.website}`;
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = window.location.href
    }

    const edit = () => {
        setPage('CreateProfile');
    }

    return (
        <div className='container'>

            <div style={{
                backgroundImage: `url('${images[1]}')`,
                padding: "25px",
                marginTop: '25px',
                borderRadius: "100px 15px 15px 15px",
                textShadow:
                    "0.2em 0.2em 0.2em white,0.1em 0.1em 0.2em white,-0.2em 0.2em 0.2em white,-0.1em 0.1em 0.2em white,0.2em -0.2em 0.2em white,0.1em -0.1em 0.2em white,-0.2em -0.2em 0.2em white,-0.1em -0.1em 0.2em white"
            }}>
            <h5 onClick={logout} style={{float: 'right',cursor: 'pointer',backgroundColor: 'grey'}}>Logout</h5>
            <p> </p>
            <h5 onClick={edit} style={{float: 'right',cursor: 'pointer',backgroundColor: 'grey'}}>Edit</h5>
                <div className="row">

                    <div className="col-md-4">
                        <img src={images.defaultImage} className="align-self-start mr-3" alt="profile pic" id='profPic'
                            style={{
                                width: "200px",
                                borderRadius: "100px",
                                border: "10px solid white",
                                boxShadow: "-5px 10px 10px grey",
                                marginBottom: '25px'
                            }}>
                        </img>
                    </div>

                    <div className="col-md-6">
                        <h1 id="usrName"> - </h1>
                        <a id="usrWeb" href='www.google.com' target="_blank" rel="noopener noreferrer">Portfolio</a>
                        <p id="usrCity"></p>
                        <h5>Test Result:</h5>
                        <p id='testResults'></p>
                    </div>
                </div>
                <br></br>
                <div className="row" >
                    <div className="col-md-4"></div>
                    <div className="col-md-6"
                        style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "10px"
                        }}
                    >
                        <p style={{
                            overflow: "hidden",
                            wordBreak: "break-word",
                            marginBottom: "0"
                        }}>
                            &#8195;<span id='usrDescription'></span>
                        </p>
                    </div>
                </div>


            </div>
            <h1 id='test' style={{marginTop: '25px'}}>Logged in as: {usrEmail}</h1>
        </div>
    );
}
export default Candidate;