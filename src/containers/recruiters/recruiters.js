import React, {Component} from 'react'
import { connect } from 'react-redux';
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'


class Recruiters extends Component {

	componentDidMount() {
		this.props.getUserList('job-seeker')
	}

	render () {
		return (
			<div>
				<UserList userList={this.props.userList}/>
			</div>
		)
	}
}

export default connect(
	state => ({
		userList: state.userList,
		user: state.user
	}),
	{getUserList}
)(Recruiters);