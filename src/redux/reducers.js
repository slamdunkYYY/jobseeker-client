import {combineReducers} from 'redux'
import {getRedirectTo} from '../utils'
import Cookies from 'js-cookie'

const initUser = {
	username:'',
	user_type:'',
	msg:'', //error msg
	redirectTo: '',
}

const initUserList = []

const initChat = {
	users: {},
	chatMsgs: [],
}

function user(state=initUser, action) {
	switch(action.type) {
		case 'RECEIVE_USER':
			return action.data
		case 'RESET_USER':
			return {...initUser, msg: action.data}
		case 'RESET_COOCKIE':
		 	Cookies.remove('userid')
		 	return initUser
		case 'REMOVE_USER':
		 	Cookies.remove('userid')
			return {...initUser}
		case 'AUTH_SUCCESS':
			const {user_type,avantar} = action.data
			return	{...action.data, redirectTo:getRedirectTo(user_type,avantar)}
		case 'ERROR_MSG':
			return {...state, msg: action.data}
		default: 
			return state
	}
}

function userList(state=initUserList, action) {
	switch(action.type) {
		case 'RECEIVE_USER_LIST':
			return action.data
		default:
			return state
	}
}

function chat(state=initChat,action) {
	switch(action.type) {
		case 'INIT_CHAT':
			var {users,chatMsgs,targetId,targetName,targetAvantar} = action.data
			let usersCopy = Object.assign({}, users);
			usersCopy[targetId]={username:targetName, "avantar":targetAvantar}
			return {...state,users:usersCopy,chatMsgs:chatMsgs}
		case 'RECEIVE_MSG_LIST':
			var {users,chatMsgs,userid} = action.data
			return {...state,users:users,chatMsgs:chatMsgs}
		case 'RECEIVE_MSG':
			var {chatMsg, userid} = action.data
			return {...state, chatMsgs:[...state.chatMsgs,chatMsg]}
		case 'MSG_READ':
			  const {sender, receiver, count} = action.data
			  debugger
			  const from = sender
			  const to = receiver
		      state.chatMsgs.forEach(msg => {
		        if(msg.from===to && msg.to===from && !msg.read) {		      	
		          msg.read = true
		        }
		      })
		      return {
		        users: state.users,
		        chatMsgs: state.chatMsgs.map(msg => {
		          if(msg.from===to && msg.to===from && !msg.read) { // 需要更新
		            return {...msg, read: true}
		          } else {
		            return msg
		          }
		        })
				}
		default:
			return state
	}
}

export default combineReducers({
	user,
	userList,
	chat
})