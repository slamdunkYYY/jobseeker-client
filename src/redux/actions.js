import { INIT_CHAT,RESET_COOCKIE,AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST,REMOVE_USER, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ, REMOVE_USER_ALL_MSG  } from './action-types'
import io from 'socket.io-client'
import {
	reqRegister,
	reqLogin,
	reqUpdateUser,
	reqUser,
	reqRemoveUser,
	reqUserList,
	reqChatMsgList,
	reqReadMsg,
} from '../api'

function initIO(dispatch, userid) {
	if (!io.socket) {
		io.socket = io('ws://localhost:3050')
		io.socket.on('receiveMsg',function(chatMsg){
			if (userid===chatMsg.from || userid===chatMsg.to) {
				dispatch(receiveMsg({chatMsg,userid}))
			}
		})	
	}
}

async function getMsgList(dispatch,userid) {
	initIO(dispatch,userid)
	const response = await reqChatMsgList()
	const result = response.data
	if (result.code ===0) {
		const {users, chatMsgs} = result.data
		dispatch(receiveMsgList({users,chatMsgs,userid}))
	}
}

const msgRead = ({count, from, to}) => ({
	type: MSG_READ, 
	data: {count, from, to}
})


const receiveMsg = ({chatMsg, userid})=>({
	type: RECEIVE_MSG,
	data: {chatMsg, userid}
}) 

export const receiveMsgList = ({users,chatMsgs,userid}) => ({
	type:RECEIVE_MSG_LIST,
	data:{users,chatMsgs,userid}
})

const receiveUserList=(userlist) => ({
	type: RECEIVE_USER_LIST,
	data: userlist
})

const receiveUser = (user) =>({
	type: RECEIVE_USER, 
	data: user
})
export const resetUser = (msg) =>({
	type: RESET_USER, 
	data: msg
})
const resetCoockie = () => ({
	type: RESET_COOCKIE,
})
const deleteUser = (user_id) =>({
	type: REMOVE_USER,
	data: user_id
})
const deleteUserAllMessage = (user_id) =>({
	type: REMOVE_USER_ALL_MSG,
	data: user_id
})

const authSuccess = (user) =>({
	type: AUTH_SUCCESS, 
	data: user
})

const errorMsg = (msg) =>({
	type: ERROR_MSG, 
	data: msg
})

export const initialChat = ({users,chatMsgs,targetId,targetName,targetAvantar}) => ({
	type: INIT_CHAT,
	data: {users,chatMsgs,targetId,targetName,targetAvantar}
})

export const register = (user) => {
	const {username, password, confirm_password,user_type} = user
	if (!username) {
		return errorMsg('enter username')
	}
	if (!password) {
		return errorMsg('enter password')
	}
	if (password!==confirm_password) {
		return errorMsg('password not same')
	}
	return async (dispatch) => {
		try {
			const response = await reqRegister({username,password,user_type})
			const result = response.data
			if (result.code ===0) {
				getMsgList(dispatch,result.data._id)
	 			dispatch(authSuccess(result.data))
			}
			else {
	 			dispatch(errorMsg(result.msg))
			}
		}
		catch (err) {
			console.log("err "+err)
		}
	}
}

export const login = (user) => {
	debugger
	const {username, password} = user
	if (!username&&!password) {
		return errorMsg('enter username and password')
	}
	if (!username) {
		return errorMsg('enter username')
	}
	if (!password) {
		return errorMsg('enter password')
	}
	return async (dispatch) => {
		debugger
		const response = await reqLogin(user)
		const result = response.data
		if (result.code ===0) {
			getMsgList(dispatch,result.data._id)
 			dispatch(authSuccess(result.data))
		}
		else {
 			dispatch(errorMsg(result.msg))
		}
	}
}

export const updateUser = (user) => {
	return async (dispatch) => {
		const response = await reqUpdateUser(user)
		const result = response.data
		if (result.code ===0) {
 			dispatch(receiveUser(result.data))
		}
		else {
 			dispatch(resetUser(result.msg))
		}
	}
}

export const getUser = () => {
	return async (dispatch) => {
		const response = await reqUser()
		const result = response.data
		if (result.data) {
			if ((result.code ===0)) {
				getMsgList(dispatch,result.data._id)
	 			dispatch(receiveUser(result.data))
			}
			else {
	 			dispatch(resetUser(result.msg))
			}
		}
		else {
			dispatch(resetUser(result.msg))
			dispatch(resetCoockie())
		}
	}
}

export const removeUser = (user_id) => {
	return async (dispatch) => {
		const response = await reqRemoveUser()
		const result = response.data
		if (result.code ===0) {
			dispatch(deleteUserAllMessage(user_id))
 			dispatch(deleteUser(user_id))
		}
	}
}

export const getUserList = (user_type) => {
	return async (dispatch) => {
		const response = await reqUserList(user_type)
		const result = response.data
		if (result.code ===0) {
 			dispatch(receiveUserList(result.data))
		}
	}
}

export const sendMsg = ({from,to,content}) => {
	return async dispatch => {
		io.socket.emit('sendMsg',{from,to,content})
	}
}

export const readMsg = (from,to) => {
	return async (dispatch) => {
		const response = await reqReadMsg(from)//await reqReadMsg({from:targetId})
		const result = response.data
		if(result.code===0) {
			const count = result.data
    		dispatch(msgRead({count, from, to}))
		}
	}
}
