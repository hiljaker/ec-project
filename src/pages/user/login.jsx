import React, { Component } from 'react';
import "./style/login.css"
import Gambar1 from "./../../assets/bangku.jpg"
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginAction } from '../../redux/actions';



class Login extends Component {
    state = {
        showpass: "password",
        username: "",
        password: ""
    }

    onShowPass = (e) => {
        if (e.target.checked) {
            this.setState({ showpass: "text" })
        } else {
            this.setState({ showpass: "password" })
        }
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    LoginHandler = () => {
        const { username, password } = this.state
        axios.get(`http://localhost:7000/users?username=${username}&password=${password}`)
            .then((res) => {
                if (res.data.length) {
                    alert(`user ada`)
                    localStorage.setItem('id', res.data[0].id)
                    this.props.LoginAction(res.data[0])
                } else {
                    alert(`user tidak ada`)
                }
            }).catch((err) => {
                alert(`server error`)
            })
    }

    onLoginClick = () => {
        this.LoginHandler()
    }

    render() {
        const { showpass, username, password } = this.state
        if (this.state.isLogin) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div>
                <div className="container mt-5 login-container">
                    <div className="row" height="100%">
                        <div className="col-md-6 d-none d-md-block p-0">
                            <img src={Gambar1} alt="" width="100%" height="99%" />
                        </div>
                        <div className="col-md-6 col-12 d-flex flex-column justify-content-center align-items-center">
                            <h1>Login</h1>
                            <input type="text" value={username} onChange={this.onInputChange} placeholder="username" name="username" className="my-2 form-control" />
                            <input type={showpass} value={password} onChange={this.onInputChange} name="password" placeholder="password" className="my-2 form-control" />
                            <div>
                                <input type="checkbox" onChange={this.onShowPass} /> Show Password
                            </div>
                            <div className="align-self-start">
                                <button onClick={this.onLoginClick} className="p-2 rounded btn btn-primary text-login">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin
    }
}

export default connect(mapStateToProps, { LoginAction })(Login);