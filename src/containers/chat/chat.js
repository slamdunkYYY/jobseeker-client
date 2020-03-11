import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon} from 'antd-mobile'
import { Smile } from 'react-feather';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { connect } from 'react-redux';
import { sendMsg, readMsg } from '../../redux/actions';

const Item = List.Item

class Chat extends Component {
	state = {
		content:"",
		showEmojiPicker: false
	}

	componentDidMount() {
	// 初始显示列表
		window.scrollTo(0, document.body.scrollHeight)
		// const targetId = this.props.match.params.userid
		// const userId = this.props.user._id
		// this.props.readMsg(targetId,userId)
		// const {user} = this.props
		// const {users, chatMsgs} = this.props.chat
		// if(!users[targetId]&&chatMsgs.length===0) {
		// 	console.log("initial")
		// 	const userListInitial = this.props.userList[0]
		// 	const targetName = userListInitial.username
		// 	const targetAvantar = userListInitial.avantar
		// 	this.props.initialChat({users,chatMsgs,targetId,targetName,targetAvantar})
		// }
	}

	componentDidUpdate() {
		window.scrollTo(0, document.body.scrollHeight)
	}
	
	componentWillUnmount() {
	    const from = this.props.match.params.userid
	    const to = this.props.user._id
	    this.props.readMsg(from, to)
	}
	
	handleSend = () => {
		const from = this.props.user._id
		const to = this.props.match.params.userid
		const content = this.state.content.trim()
		if (content) {
			this.props.sendMsg({from,to,content})
		}
		this.setState({content: ''})
	}

	toggleEmojiPicker = () => {
	      this.setState({
	        showEmojiPicker: !this.state.showEmojiPicker,
	      });
	}

	addEmoji = (e) => {
	  let emoji = e.native;
	  this.setState({
	    content	: this.state.content + emoji,
	    showEmojiPicker: false
	  });
	  // document.getElementById("message-input").focus();
		this.InputItem.focus();
	};
	render () {
		const {user} = this.props
		const {users, chatMsgs} = this.props.chat
		const targetId = this.props.match.params.userid
		// console.log("users",users)
		// console.log("size",Object.keys(users).length)

		if(!users[targetId]&&chatMsgs.length===0) {
			console.log("initial")
			if (Object.keys(users).length==1) {
				window.location.reload()
			}
		}
		if(!users[targetId]) {
			console.log("no content")
			return null
		}
 		const targetName = users[targetId].username
		const targetIcon = users[targetId] ? require(`../../assets/images/${users[targetId].avantar}.png`) : null
 		const meID = user._id
		const chatId = [meID,targetId].sort().join("_")
		const resultMsg = chatMsgs.filter(chatMsgs=>chatMsgs.chat_id===chatId)
		return (
			<div id='chat-page'>
			<NavBar className='stick-top' icon={<Icon type='left'/>} onClick={()=>{this.props.history.goBack()}}>{targetName}</NavBar>
				<List style={{marginBottom: 40}}>
					{
						resultMsg.map((item) =>
							{	
								if (item.from===meID) {
									return (
										<Item key={item._id} extra="me" className="chat-me">{item.content}</Item>
									)
								}
								else {
									return (
										<Item key={item._id}  thumb={targetIcon} >{item.content}</Item>		
									)
								}
							}
						)
					}
				</List>
				<div className='am-tab-bar'>
					<InputItem
          			ref={(InputItem) => { this.InputItem = InputItem; }} 
					placeholder="请输入"
					value={this.state.content}
					onChange = {val => this.setState({content: val})}
					onKeyPress={event => {
                			if (event.key === 'Enter') {
                 				this.handleSend()
                			}
              			}}					
              		extra={
              		<div>
              			<button
		                    className="toggle-emoji"
							onClick={this.toggleEmojiPicker}
		                  >
	                   		<Smile />
						</button>
						<span style={{cursor: "pointer",verticalAlign:"middle"}} onClick={this.handleSend} >发送</span>
					</div>
					}
					/>
				</div>
					{this.state.showEmojiPicker ? <Picker onSelect={this.addEmoji} />:null}
				</div>
		)
	}
}

export default connect(
	state => ({
		user: state.user,
		chat: state.chat
	}),
	{sendMsg, readMsg}
)(Chat);