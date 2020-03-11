import React, {Component} from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import {resetUser, removeUser} from '../../redux/actions';
import Cookies from 'js-cookie'

const Item = List.Item
const Brief = Item.Brief

class PersonalDetail extends Component {

	handleLogout = () => {
		Modal.alert('Logout', 'Are you sure logout?', [
			{
				text: 'Cancel',
				onPress: () => console.log('cancel')
			},
			{
				text: 'Confirm',
				onPress: () => {
					Cookies.remove('userid')
					this.props.resetUser()
				}
			}
		])
	}

	handleRemoveAccount = () => {
		const user_id = this.props.user._id
		Modal.alert('Remove', 'Are you sure delete account?', [
			{
				text: 'Cancel',
				onPress: () => console.log('cancel')
			},
			{
				text: 'Confirm',
				onPress: () => {
					this.props.removeUser(user_id)
				}
			}
		])
	}

	render () {
		const {avantar,username, introduction, position, company, salary } = this.props.user
		return (
			<div>
				<Result
					img={<img src={require(`../../assets/images/${avantar}.png`)} style={{width: 50}}
					alt="avantar"/>}
					title={username}
					message={company}
				/>
				<List renderHeader={() => 'Detail'}>
				<Item multipleLine>
					<Brief>Position: {position}</Brief>
					<Brief>Introduction: {introduction}</Brief>
					{salary?<Brief>Salary: {salary}</Brief>:null}
				</Item>
				</List>
				<WhiteSpace/>
				<List>
				<Button type='warning' onClick={this.handleLogout}>Logout</Button>
				<Button type='warning' onClick={this.handleRemoveAccount}>Remove Account</Button>
				</List>
			</div>
		)
	}
}

export default connect(
	state => ({
		user: state.user
	}),
	{resetUser, removeUser }
)(PersonalDetail);