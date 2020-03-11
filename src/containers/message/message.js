import React, {Component} from 'react'
import {List, Badge} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux';
import axios from 'axios'

const Item = List.Item
const Brief = Item.Brief

class Message extends Component {

	render () {
		const {user} = this.props
		const {users,chatMsgs} = this.props.chat
 		const fromMsg = chatMsgs.filter(chatMsgs=>chatMsgs.to===user._id)
 		fromMsg.sort(function (msg1, msg2) {
			return msg2.create_time-msg1.create_time
		})
		const sortedMsgs = fromMsg.reduce(function (pre, current, index) {
		  pre[current.from] = pre[current.from] || []
		  pre[current.from].push(current)
		  return pre
		}, {})
		return (
			<List>
			{
				Object.keys(sortedMsgs).map((item) =>
					{	
						const targetName = users[item].username
						if (!sortedMsgs[item]) {
							return null
						}
						else {
							console.log(sortedMsgs[item])
							const readMsgs = sortedMsgs[item].filter((sortedMsg)=>!sortedMsg.read)
							return (
							<Item
								key = {item}
								arrow='horizontal'
								onClick={()=>{this.props.history.push(`/chat/${item}`)}}
								>
								{targetName}
								<Brief>{sortedMsgs[item][0].content}</Brief>
							</Item>
						)
						}
					}
			 )
			}
			</List>
		)
	}
}

export default connect(
	state => ({
		user: state.user,
		chat: state.chat
	}),
	{}
)(Message);