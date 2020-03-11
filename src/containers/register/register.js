import React, {Component} from 'react'
import { 
	NavBar, 
	List, 
	WingBlank, 
	InputItem,
	WhiteSpace,
	Button,
	Radio
} from 'antd-mobile'
import { connect } from 'react-redux';
import { register } from '../../redux/actions';
import { Redirect } from 'react-router-dom'
import Logo from '../../components/logo/logo'


class Register extends Component {
	state = {
		username: "",
		password: "",
		confirm_password: "",
		user_type: "job-seeker",
		
	}

	handleChange = (name,val)=> {
		this.setState({
			[name]: val
		})
	}

	register = () => {
		this.props.register(this.state)
	}

	toLogin = () => {
		this.props.history.replace('/login')
	}

	render () {
		const ListItem = List.Item
		const { user_type } = this.state
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
						<InputItem 
							labelNumber = {7}						
							type = 'password'
							placeholder = 'Confirm password'
							onChange={(val) => { this.handleChange('confirm_password', val)}}
						>Confirm:</InputItem>
						<ListItem>
							<span>User Type:</span>&nbsp;&nbsp;&nbsp;
							<Radio 
								checked = {user_type==="job-seeker"}
								className="my-radio"
								onChange={(val) => { this.handleChange('user_type', 'job-seeker')}}
							> Job Seeker</Radio>
							&nbsp;&nbsp;
							<Radio 
								checked = {user_type==="recruiters"}
								className="my-radio"
								onChange={(val) => { this.handleChange('user_type', 'recruiters')}}
							> Recruiters</Radio>
						</ListItem>
					    <WhiteSpace size="xl" />
						<Button type="primary" onClick={this.register}>Register</Button>
						<Button onClick={this.toLogin}>Login</Button>
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
	{register}
)(Register);