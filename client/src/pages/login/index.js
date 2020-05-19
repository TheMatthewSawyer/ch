import React, { useGlobal } from 'reactn';
import Card from '../../components/Card';
import Entry from '../../components/Entry'

function Login() {
    const [CurrentPage, SetCurrentPage] = useGlobal();

    return (
        <div className="jumbotron container" style={{marginTop: '25px'}}>

            <h1 className="display-4 text-center" style={{ marginBottom: "32px" }}>Welcome to the Choober Candidate Portal!</h1>
            <Card title="Have an account?" sub="Please enter your login information below. Both your username and password are case sensitive"
                errorName="signInError"
                entry={[
                    <Entry key='emailLoginEntry' req="none" type="email" name="userEmail" disp="Email Address" />,
                    <Entry key='passwordLoginEntry' req="none" type="password" name="userPassword" disp="Password" />,
                    <div key='signInBtnContainer' className="text-center">
                        <a className="btn btn-primary" id="userSignInBtn" style={{ color: "white" }}>Sign In</a>
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
                        <a className="btn btn-primary" id="createUserBtn" style={{ color: "white" }}>Create Account</a>
                    </div>
                ]}
            />
        </div>

    );

}

export default Login;