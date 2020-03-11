
import ajax from './ajax'
//reigister
export const reqRegister = (user) => ajax('/register', user, 'POST')
//login
export const reqLogin = ({username,password}) => ajax('/login', {username,password}, 'POST')
//update user
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
//get user info
export const reqUser = () => ajax('/user')
//remove user
export const reqRemoveUser = (user_id) => ajax('/remove', user_id, 'POST')
//get list
export const reqUserList = (user_type) => ajax('/list', {user_type})
//get message
export const reqChatMsgList = () => ajax('/msglist')
//read message
export const reqReadMsg = (from) => ajax('/readmsg', from, 'POST')

export const reqRemoveUserAllMsg = (user_id) => ajax('/remove-user-all-msg', user_id, 'POST')

