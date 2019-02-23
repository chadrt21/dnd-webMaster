/** 
 * You can store that in state

So when your making your dice roller, you need to ask two questions (it helps to pretend to be the component):
1. What do I need to know about myself to render?
2. What do I need to know about my context to render?
So the dice roller would need to know three things in order to render
1. The number of dice rolling
2. The number of sides on said dice
3. The result of the last roll
It doesn't need to know anything about it's context and can store all of that in state
*/

import React from 'react';
import ToolBase from '../ToolBase';

class NumGenerator extends ToolBase {
    constructor(props){
        super(props);
        this.state = {
            min: 1,
            max: 6,
            number: 1,
        }
    }  
}
    componentDidMount() { /*setting the state's number?*/
    this.setState({ number: this.generateNumber(this.state.min, this.state.max)})
}