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

class JobSeekerInfo extends Component {
	state = {
		avantar: '',
		position: '',
		introduction: '',
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
		const {avantar, user_type} = this.props.user
		if (avantar) {
			 const path = user_type==='job-seeker' ? '/job-seeker' : '/recruiters'
     		 return <Redirect to={path}/>
		}
		else {
			return (
					<div>
						<NavBar>Job Seeker Info</NavBar>
						<AvantarSelector setAvantar={this.setAvantar}/>
						<InputItem 
							placeholder = 'Please enter position'
							labelNumber = {7}
							onChange={(val) => { this.handleChange('position', val)}}			
						>Position:</InputItem>			
						<TextareaItem title="Introduction:" row={3} labelNumber={7} onChange={(val) => { this.handleChange('introduction', val)}}/>
						<Button type="primary"	onClick={this.toSave}>Save</Button>
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
)(JobSeekerInfo);
