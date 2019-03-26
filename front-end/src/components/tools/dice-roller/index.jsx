/*
 * @description This component generates the dice rolling tool
 * @author Ashley Cheah
 */

import React from 'react';
import ToolBase from '../ToolBase';
<<<<<<< HEAD
//import Button from '@blueprintjs/core';
//import styles from './styles.less';

=======
import styles from './styles.less';
//<Component className={styles.yourClassName} />

import {
	Alignment,
	Button,
	ButtonGroup,	
} from '@blueprintjs/core';


 
>>>>>>> stylizing the buttons using blueprint js
export default class diceroller extends ToolBase{
	constructor(props){
		super(props);
		this.state = {
			min: 1,
			max: 20,
			number: 1,
		};
	} 
	componentDidMount() { /*setting the generated number each time*/
		this.generateNumber();
	}
	changeNumber(){
		this.setState({
			min: 1,
			max: 6,
			number: 1,
		});
		this.generateNumber(); /* after the max "resets" send it to this.generateNumber() */
	}

	/*generate the number*/ 
	generateNumber = () => this.setState(previousState => ({ number: Math.floor(Math.random()*(previousState.max)+1) }));
	
	

	render() {
		return(
			<div className = "diceRoller"> 
<<<<<<< HEAD
				<h1> Dice Roller </h1>
				<div id = "outputContainer"> 
					<p id="rNum">{ this.state.number }</p>
				</div> 
				<div id = "buttonClick">
					<button id="generate" onClick={ this.changeNumber }>
						Roll a d6
					</button>
					<button id="generate20" onClick={ this.generateNumber }>
						Roll a d20
					</button>
				</div>
=======
				<h1 className={styles.h1}> Dice Roller </h1>
				<div className="dice-button-group">
					<button type="button" className="rollButton" onClick={ () => this.maxChange(4) }>
						Roll
					</button>
					<button type="button" className="icon-caret-down"  onClick={ () => this.maxChange(6) }>
						caret here
					</button>
				</div>
				<div className={styles.dice} id = "outputContainer"> 
					<p id="rNum">{ this.state.number }</p>
				</div> 
>>>>>>> stylizing the buttons using blueprint js
			</div>
		);
	}
}