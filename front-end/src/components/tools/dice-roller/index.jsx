/*
 * @description This component generates the dice rolling tool
 * @author Ashley Cheah
 */

import React from 'react';
import ToolBase from '../ToolBase';
import styles from './styles.less';


import {
	Button,
	ButtonGroup,
	InputGroup,
	Popover,	
} from '@blueprintjs/core';


 
export default class diceroller extends ToolBase{
	constructor(props){
		super(props);
		this.state = {
			min: 1,
			max: 6,
			number: 1,
			timesRolled: 1,
			textInputValue: '',
		};
	} 
	componentDidMount() { /*setting the generated number each time*/
		this.generateNumber();
	
	}
	/* max Change */
	maxChange = (n) => { 
		this.setState({ 
			max: n,
		},
		this.generateNumber(), 
		);	
	}

	/*generate the number*/ 
	generateNumber = () => this.setState(
		previousState => {
			let number = 0;
			for(let i = 0; i < previousState.timesRolled; i++)
			{
				number += Math.floor(Math.random()*(previousState.max)+1);
			}
			return{
				number,
			};
		}
	);
	
	onTextInputChange = (event) => 	
	{ 
		const splitText = event.target.value.split('d'); //splits into number of times rolled and max number
		
		this.setState({ textInputValue: event.target.value, 
			timesRolled: splitText[0],
			max: splitText[1], 
		});
	};
		

	render() {
		const {
			textInputValue, 
		} = this.state;

		return(
			<div className = "diceRoller"> 
				<h1 className={styles.h1}> Dice Roller </h1>
				<div className={styles.dice} id = "outputContainer"> 
					<p id="rNum">{ this.state.number }</p>
				</div> 
				<ButtonGroup>
					<Button intent="primary" onClick={this.generateNumber}>
						Roll
					</Button>
					
					<Popover modifiers={{ arrow: false }}>
						<Button icon="caret-down" intent="primary"/>
						<InputGroup placeholder="ex: 2d8" value={textInputValue} pattern="d1" onChange={this.onTextInputChange}/> 
					</Popover>
				</ButtonGroup>
				
			</div>
		);
	}
}