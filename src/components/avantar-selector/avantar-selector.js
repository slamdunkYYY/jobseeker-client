import React, {Component} from 'react'
import { 
	List, 
	Grid
} from 'antd-mobile'

export default class AvantarSelector extends Component {
	state = {
		data: [],
		icon: null
	}
	componentDidMount() {
		const data = Array.from(new Array(20)).map((_val, i) => ({
	  		icon: require(`../../assets/images/avantar${i+1}.png`),
		  text: `avantar${i+1}`,
		}));
		this.setState({
			data
		})
	}

	onSelectAvantar = ({text,icon}) => {
		this.props.setAvantar(text)
		this.setState({
			icon
		})
	}
	render () {
		const {data, icon} = this.state
		const listHeader=icon?(<div>Selected avantar: <img alt="avantar" style={{width:"35px"}}src={icon}/></div>):'Select avantar'
		return (
			<List renderHeader={()=>listHeader}>
				<Grid data={data} columnNum={5} onClick={this.onSelectAvantar}></Grid>
			</List>
		)
	}
}