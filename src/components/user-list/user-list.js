import React, {Component} from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

	render () {
		return (
			<div>
				<WingBlank style={{marginTop:50,marginBottom:105}}>
				{
					this.props.userList.map((user) => {
						return (
						<div key={user._id}>
							<WhiteSpace/>
							<Card onClick={()=>{this.props.history.push(`/chat/${user._id}`)}}>
								<Header
								thumb={require(`../../assets/images/${user.avantar}.png`)}
								extra={user.username}
								/>
								<Body>
									<div>Position: {user.position}</div>
									{user.company ? <div>Company: {user.company}</div> : null}
									{user.salary ? <div>Salary: {user.salary}</div> : null}
									<div>Introduction: {user.introduction}</div>
								</Body>
							</Card>
						</div>
						)
					}
					)
				}
				</WingBlank>
			</div>
		)
	}
}
export default withRouter(UserList)