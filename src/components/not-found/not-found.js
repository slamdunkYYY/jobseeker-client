import React, {Component} from 'react'
import { 
	Button,
} from 'antd-mobile'



export default class NotFound extends Component {

	render () {
		return (
			<div>
				<h2 style={{textAlign:'center'}}>Cannot find the page</h2>
				<Button type="primary" onClick={()=>{this.props.history.replace("/")}}>back to homepage</Button>
			</div>
		)
	}
}