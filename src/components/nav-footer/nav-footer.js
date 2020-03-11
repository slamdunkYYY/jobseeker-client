import React, {Component} from 'react'
import { 
	TabBar,
} from 'antd-mobile'
import {withRouter} from 'react-router-dom'


const Item = TabBar.Item

class NavFooter extends Component {

	render () {
		const navList = this.props.navList.filter(nav => !nav.hide)
		const {pathname} = this.props.location
		return (
			<div>
			<TabBar>
				{
					navList.map((nav, index) => 
						{
						return (
						<Item key={nav.path}
							title={nav.text}
							icon={{uri: require(`./images/${nav.icon}.png`)}}
							selectedIcon={(nav.icon!=='detail')?{uri: require(`./images/${nav.icon}-selected.png`)}:{uri: require(`./images/detail-selected.png`)}}
							selected={pathname===nav.path}
							onPress={() => {
								this.props.history.replace(nav.path)
							}}
						/>
						)
						}
					)
				}
			</TabBar>	
			</div>	
)
	}
}
export default withRouter(NavFooter)