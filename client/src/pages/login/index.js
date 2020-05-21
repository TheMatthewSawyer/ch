import React from 'react';
import Card from '../../components/Card';
import Entry from '../../components/Entry';
const axios = require('axios');

function Login(props) {
    const setPage = props.setPage;

    React.useEffect(()=>{
        window.scrollTo(0, 0);
    });
    
    const logInHandler = (e) => {
        e.preventDefault();
        const userEmail = document.getElementById('userEmail');
        const userPassword = document.getElementById('userPassword');
        const signInError = document.getElementById('signInError');
        userEmail.style.border = "1px solid #ced4da";
        userPassword.style.border = "1px solid #ced4da";
        if(isEmpty(userEmail.value)) { userEmail.style.border = "2px solid red";return;}
        if(isEmpty(userPassword.value)) { userPassword.style.border = "2px solid red";return;}
        axios
            .post('/api/login/',{
                email: userEmail.value.toLowerCase(),
                password: userPassword.value
            })
            .then(function (res) {
                console.log(res);
                if(res.data.email) {
                    if(res.data.recruiter === true) {
                        console.log('recruiter good');
                        localStorage.setItem(`${window.btoa('email')}`, `${window.btoa( userEmail.value )}`);
                        localStorage.setItem(`${window.btoa('recruiter')}`, `${window.btoa( res.data.recruiter )}`);
                        setPage('Recruiter');
                    } else {
                        console.log('candidate good');
                        let email = `${window.btoa('email')}`
                        localStorage.setItem(`${email}`, `${window.btoa( userEmail.value )}`);
                        localStorage.setItem(`${window.btoa('recruiter')}`, `${window.btoa( res.data.recruiter )}`);
                        setPage('Candidate');
                    }
                } else {
                    signInError.value = 'Incorrect email or password'
                    console.log('bad');
                }
            })
            .catch(err => console.log(err));
    }
    const createAccountHandler = (e) => {
        e.preventDefault();
        const newEmail = document.getElementById('newEmail');
        const newPassword1 = document.getElementById('newPassword1');
        const newPassword2 = document.getElementById('newPassword2');
        newEmail.style.border = "1px solid #ced4da";
        newPassword1.style.border = "1px solid #ced4da";
        newPassword2.style.border = "1px solid #ced4da";
        console.log(newEmail.value, newPassword1.value, newPassword2.value);
        if(newPassword1.value !== newPassword2.value) {
            newPassword1.style.border = "2px solid red";
            newPassword2.style.border = "2px solid red";
            return;
        }
        if(isEmpty(newEmail.value)) { newEmail.style.border = "2px solid red";return;}
        if(isEmpty(newPassword1.value)) { newPassword1.style.border = "2px solid red";return;}
        const FreshEmail = newEmail.value.toLowerCase();
        axios
            .post('/api/newUser',{
                email: FreshEmail,
                password: newPassword1.value
            })
            .then(function (res) {
                if(res.data === 'Email already in use') {
                    newEmail.style.border = "2px solid red";
                    return;
                } else if (res.data === true) {
                    localStorage.setItem(`${window.btoa('email')}`, `${window.btoa( FreshEmail )}`);
                    setPage('Candidate');
                } else {
                    newEmail.value = 'Server error, please reload!';
                }
                console.log(res);
            })

    }


    return (
        <div className="jumbotron container" style={{marginTop: '25px'}}>

            <h1 className="display-4 text-center" style={{ marginBottom: "32px" }}>Welcome to the Choober Candidate Portal!</h1>
            <Card title="Have an account?" sub="Please enter your login information below. Your password is case sensitive!"
                errorName="signInError"
                entry={[
                    <Entry key='emailLoginEntry' req="none" type="email" name="userEmail" disp="Email Address" />,
                    <Entry key='passwordLoginEntry' req="none" type="password" name="userPassword" disp="Password" />,
                    <div key='signInBtnContainer' className="text-center">
                        <button onClick={logInHandler} className="btn btn-primary" id="userSignInBtn" style={{ color: "white" }}>Sign In</button>
                    </div>
                ]}
            />
            <br></br>
            <Card title="Not a registered user yet?" sub="Create an account to apply for our opportunities. Login credentials are case sensitive"
                errorName="registerError"
                entry={[
                    <Entry key='emailCreateEntry' req="none" type="newEmail" name="newEmail" disp="Email Address" />,
                    <Entry key='passwordCreateEntry' req="none" type="password" name="newPassword1" disp="Password" />,
                    <Entry key='passwordCheckCreateEntry' req="none" type="password" name="newPassword2" disp="Re-type Password" />,
                    <div key='createUserBtnContainer' className="text-center">
                        <button onClick={createAccountHandler} className="btn btn-primary" style={{ color: "white" }}>Create Account</button>
                    </div>
                ]}
            />
        </div>

    );

}

function isEmpty(string) {
    if(string === null || string === "" || /\s/g.test(string) === "") {
        return true;
    } else {
        return false;
    }
}

export default Login;