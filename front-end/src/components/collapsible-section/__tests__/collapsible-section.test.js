import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollapsibleSection from '../index';

// Set up the adapter that allows us to test render React components
configure({ adapter: new Adapter() });

// Set up constants that we will use in testing
const CONTENT = "I am the content!";
const TITLE = "I am a title!";
const CHANGE_EXPANDED = jest.fn();

describe(
    'CollapsibleSectionComponent',
    () => 
    {
        //We are first checking to make sure the component renders
        //Let's check that!
       it('should render the component',() => {
			// 1) Mount the component
			const component = mount(
                <CollapsibleSection
                    title={TITLE}
                    expanded={true}
                    changeExpanded={CHANGE_EXPANDED}
                >
                    {CONTENT}

                </CollapsibleSection>
            );
            // 2) Expect that the component matches the snapshot we have of it
			expect(component).toMatchSnapshot();
        });
        //As the user: I want this unit to be able to call change_expanded when the caret is pressed
        it('should call change_expanded when the caret is pressed', () => {
            //mount it
            const component = mount(
            <CollapsibleSection
            title={TITLE}
            expanded={true}
            changeExpanded={CHANGE_EXPANDED}
            >
                {CONTENT}
            
            </CollapsibleSection>
            );
            
            //this component has a button in it --> get button
            const button = component.find('button');
            //click the button and simulate it
            button.simulate('click');
            //check CHANGE_EPANDED to make sure it has been called
            expect(CHANGE_EXPANDED).toHaveBeenCalled();
        });

        //As the user: I want this unit to be able to expand so let's check that
        it('should expand', () =>{
            //controlled input = visual state not determined by component's state but external props
            //mount it
            //mount it
            const component = mount(
                <CollapsibleSection
                title={TITLE}
                expanded={false}
                changeExpanded={CHANGE_EXPANDED}
                >
                    <span id = "kontent">{CONTENT} </span>
                
                </CollapsibleSection>
                );
            //check to make sure the content should not be rendered since expanded is set to false
                expect(component.find('#kontent').length).toBe(0); 
            //change expanded prop change the expanded to true
                component.setProps({
                    expanded: true,
                })
            //make sure it expands + content should be rended
                expect(component.find('#kontent').length).toBe(1);            
        
            }
            
            
            );
    //As the user: I want this unit to be able to collapse
        it('should collapse', () =>{
            const component = mount(
                <CollapsibleSection
                title={TITLE}
                expanded={true}
                changeExpanded={CHANGE_EXPANDED}
                >
                    <span id = "kontent">{CONTENT} </span>
                
                </CollapsibleSection>
            );
            //check to make sure the content should not be rendered since expanded is set to false
            expect(component.find('#kontent').length).toBe(1); 
            //change expanded prop change the expanded to true
                component.setProps({
                    expanded: false,
                })
            //make sure it expands + content should be rended
                expect(component.find('#kontent').length).toBe(0);            
        });
    }
);