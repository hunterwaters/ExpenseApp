import React  from 'react';

import {
    getFromStorage,
    setInStorage,
} from './utils/storage';

 export class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            token: '',
            signupError: '',
            signinError: '',
            signInEmail: '',
            signInPassword: '',
            signupFirstName: '',
            signupLastName: '',
            signupEmail: '',
            signupPassword: '',
        };

        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
        this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        const obj = getFromStorage('expense_trackerr');
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.setState({
                        token,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        })
    }

    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        })
    }

    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signupEmail: event.target.value,
        })
    }

    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signupPassword: event.target.value,
        })
    }

    onTextboxChangeSignUpFirstName(event) {
        this.setState({
            signupFirstName: event.target.value,
        })
    }

    onTextboxChangeSignUpLastName(event) {
        this.setState({
            signupLastName: event.target.value,
        })
    }

    onSignUp() {
        //grab state
        const {
            signupFirstName,
            signupLastName,
            signupEmail,
            signupPassword
        } = this.state;

        this.setState({
            isLoading: true,
        })
        
        
        //POST request to backend
        //eslint-disable-next-line
        fetch('/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: signupFirstName,
                lastName: signupLastName,
                email: signupEmail,
                password:  signupPassword,
            }),
        }) .then( res => res.json())
        .then(json => {
                if(json.success) {
                    this.setState({
                        signupError: json.message,
                        isLoading: false,
                        signupEmail: '',
                        signupPassword: '',
                        signupFirstName: '',
                        signupLastName: '',                    });
                }else {
                    this.setState({
                        signupError: json.message,
                        isLoading: false
                    });
                }
        })
    }

    onSignIn() {
        //grab state
        const {
            signInEmail,
            signInPassword
        } = this.state;

        this.setState({
            isLoading: true,
        })
          //POST request to backend
          //eslint-disable-next-line
          fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password:  signInPassword,
            }),
        }) .then( res => res.json())
        .then(json => {
                if(json.success) {
                    setInStorage('expense_tracker',  { token: json.token});
                    this.setState({
                        signinError: json.message,
                        isLoading: false,
                        signInEmail: '',
                        signInPassword: '',
                        token: json.token
                        });
                }else {
                    this.setState({
                        signinError: json.message,
                        isLoading: false
                    });
                }
        })
        //grab state
        //POST request to backend
    }
    logout() {
        this.setState({
            isLoading: true,
        })
        const obj = (getFromStorage('expense_tracker')) ;
        if(obj && obj.token){
            const { token } = obj;
            //verify token
            fetch('/api/account/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.setState({
                        token: '',
                        isLoading: false
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        const {
            isLoading,
            token,
            signinError,
            signInEmail,
            signInPassword,
            signupFirstName,
            signupLastName,
            signupEmail,
            signupPassword,
            signupError,

        } = this.state;

        if(isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        if(!token) {
            return (
                <>
                <div>
                    <div className = "signin">
                        {
                            (signinError) ? (
                                <p>{signinError}</p>
                            ) :(null)
                        }
                        <p>Sign In</p>
                        <input type = "email" placeholder = "Email" value = {signInEmail} onChange={this.onTextboxChangeSignInEmail} />
                        <input type = "password" placeholder = "Password" value = {signInPassword} onChange={this.onTextboxChangeSignInPassword} />
                        <button onClick = {this.onSignIn}>Sign In</button>
                    </div>
                </div>
                <br />
                <br/>
                <div className = "signup">
                {
                            (signupError) ? (
                                <p>{signupError}</p>
                            ) :(null)
                        }
                        <p>Sign Up</p>
                        <input type = "text" placeholder = "First Name" value = {signupFirstName} onChange={this.onTextboxChangeSignUpFirstName} />
                        <input type = "text" placeholder = "Last Name" value = {signupLastName} onChange = {this.onTextboxChangeSignUpLastName} />
                        <input type = "email" placeholder = "Email" value = {signupEmail} onChange = {this.onTextboxChangeSignUpEmail} />
                        <input type = "password" placeholder = "Password" value = {signupPassword} onChange = {this.onTextboxChangeSignUpPassword} />
                        <button onClick = {this.onSignUp}>Sign Up</button>
                       
                    </div>
    </>
            )
        }
        return (
            <div>
            <div>Account</div>
            <button onClick = {this.logout}>Logout</button>
            </div>
        )
    }
}

