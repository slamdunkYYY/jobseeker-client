import React from 'react'
import logo from '../../assets/logo.png'
import './logo.less'

const Logo = () => {
	return (
		<div className="logo-container">
			<img src={logo} alt="logo" className='logo-img'/>
		</div>
	)
}

export default Logo