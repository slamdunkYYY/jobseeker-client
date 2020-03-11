import React, {Component} from 'react'
import { 
	NavBar, 
	WingBlank, 
	InputItem,
	WhiteSpace,
	Button,
	List
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import { Redirect } from 'react-router-dom'

class Login extends Component {
	state = {
		username: "",
		password: "",
	}

	handleChange = (name,val)=> {
		this.setState({
			[name]: val
		})
	}

	login = () => {
		this.props.login(this.state)
	}

	toRegister = () => {
		this.props.history.replace('/register')
	}

	render () {
		const { msg, redirectTo } =  this.props.user
		if (redirectTo) {
			return <Redirect to={redirectTo}/>	
		}
		else {
			return (
				<div>
					<NavBar>Job Seeker</NavBar>
					<Logo/>
					<WingBlank>
						<List>
							{ msg? <div className='error-msg'>{msg}</div>: null}
							<InputItem 
								labelNumber = {7}
								placeholder = 'Enter username'
								onChange={(val) => { this.handleChange('username', val)}}
							>Username:</InputItem>
							<InputItem 
								labelNumber = {7}
								type = 'password'
								placeholder = 'Enter password'
								onChange={(val) => { this.handleChange('password', val)}}
							>Password:</InputItem>
						    <WhiteSpace size="xl" />
							<Button type="primary" onClick={this.login}>Login</Button>
							<Button onClick={this.toRegister}>Register</Button>
						</List>
					</WingBlank>
				</div>
			)
		}
	}
}

export default connect(
	state => ({
		user: state.user
	}),
	{login}
)(Login);