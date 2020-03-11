import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import {NavBar} from 'antd-mobile'
import Cookies from 'js-cookie'

import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import RecruitersInfo from '../recruiters-info/recruiters-info'
import Recruiters from '../recruiters/recruiters'
import JobSeekerInfo from '../job-seeker-info/job-seeker-info'
import JobSeeker from '../job-seeker/job-seeker'
import Message from '../message/message'
import PersonalDetail from '../personal-detail/personal-detail'
import Chat from '../chat/chat'
import NavFooter from '../../components/nav-footer/nav-footer'
import NotFound from '../../components/not-found/not-found'


class Main extends Component {

	navList = [
	{
		path: '/recruiters', // 路由路径
		component: Recruiters,
		title: 'job seeker list',
		icon: 'job-seeker',
		text: 'Jobseeker',
	},
	{
		path: '/job-seeker', // 路由路径
		component: JobSeeker,
		title: 'Recruiters list',
		icon: 'recruiters',
		text: 'Recruiters',
	},
	{
		path: '/message', // 路由路径
		component: Message,
		title: 'message',
		icon: 'message',
		text: 'Message',
	},
	{
		path: '/personal-detail', // 路由路径
		component: PersonalDetail,
		title: 'Detail',
		icon: 'detail',
		text: 'Detail',
	}
	]	

	componentDidMount () {
		const userid = Cookies.get('userid')
		const {user} = this.props
		if (userid && !user._id) {
			this.props.getUser()
		}
	}

	render () {
		const pathname = this.props.location.pathname
		const userid = Cookies.get('userid')
		const {user} = this.props
		if (!userid) {
			// this.props.history.replace('/login')
			return <Redirect to='/login'/>
		}
		if (!user._id) {
			return null
		}
		else {
			if (pathname === '/') {
				const path = getRedirectTo(user.user_type, user.avantar)
				return <Redirect to={path}/>
			}
		}
		if (user.user_type==='recruiters') {
			this.navList[0].hide=false
			this.navList[1].hide=true
		}
		else {
			this.navList[0].hide=true
			this.navList[1].hide=false
		}
		const currentNav = this.navList.find(nav=>nav.path===pathname)
		return (
			<div>
				{currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
				<Switch>
					{
						this.navList.map((item)=><Route key={item.path} path={item.path} component={item.component}/>)
					}
	                <Route path="/recruiters-info" component={RecruitersInfo}/>
					<Route path="/job-seeker-info" component={JobSeekerInfo}/>
					<Route path="/chat/:userid" component={Chat}/>
					<Route component={NotFound}/>
			  	</Switch>  	
			  	{currentNav ? <NavFooter navList={this.navList}/> : null}
			</div>
		)
	}
}

export default connect(
	state => ({
		user: state.user,
	}),
	{getUser}
)(Main);