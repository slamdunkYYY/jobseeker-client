import React, {Component} from 'react'
import { 
	NavBar, 
	InputItem,
	TextareaItem,
	Button,
} from 'antd-mobile'
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions';
import { Redirect } from 'react-router-dom'
import AvantarSelector from '../../components/avantar-selector/avantar-selector'

class RecruitersInfo extends Component {
	state = {
		avantar: '',
		introduction: '',
		position: '',
		company: '',
		salary: ''
	}

	setAvantar = (avantar) => {
		this.setState({
			avantar
		})
	}

	handleChange = (name,val)=> {
		this.setState({
			[name]: val
		})
	}

	toSave = () => {
		this.props.updateUser(this.state)
	}

	render () {
		const {avantar} = this.props.user
		if (avantar) {
			return (
				 <Redirect to="/recruiters"/>
			)
		}
		else {
			return (
					<div>
						<NavBar>Recruiters Info</NavBar>
						<AvantarSelector setAvantar={this.setAvantar}/>
						<InputItem 
							placeholder = 'Please enter position'
							labelNumber = {7}
							onChange={(val) => { this.handleChange('position', val)}}
						>Position:</InputItem>
						<InputItem 
							placeholder = 'Please enter company name'
							labelNumber = {7}
							onChange={(val) => { this.handleChange('company', val)}}
						>Company:</InputItem>
						<InputItem 
							placeholder = 'Please enter salary'
							labelNumber = {7}
							onChange={(val) => { this.handleChange('salary', val)}}
						>Salary:</InputItem>
						<TextareaItem title="introduction:" row={3} labelNumber={7}	onChange={(val) => { this.handleChange('introduction', val)}}/>
						<Button type="primary" onClick={this.toSave}>Save</Button>												
					</div>
			)
		}
	}
}

export default connect(
	state => ({
		user: state.user
	}),
	{updateUser}
)(RecruitersInfo);
