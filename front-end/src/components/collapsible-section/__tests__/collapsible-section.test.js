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
    () => {
        //We are first checking to make sure the component renders
        //Let's check that!
        it('should render the component', () => {
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
        it('should call change_expanded when the caret is pressed', () => {
            //1) mount it
            const component = mount(
                <CollapsibleSection
                    title={TITLE}
                    expanded={true}
                    changeExpanded={CHANGE_EXPANDED}
                >
                    {CONTENT}

                </CollapsibleSection>
            );

            //2) find the button
            const button = component.find('button');
            //3) click the button and simulate it
            button.simulate('click');
            //4) check CHANGE_EXPANDED to make sure it has been called
            expect(CHANGE_EXPANDED).toHaveBeenCalled();
        });

        it('should expand', () => {
            //1) mount it
            const component = mount(
                <CollapsibleSection
                    title={TITLE}
                    expanded={false}
                    changeExpanded={CHANGE_EXPANDED}
                >
                    <span id="kontent">{CONTENT} </span>

                </CollapsibleSection>
            );
            //2) check to make sure the content should not be rendered since expanded is set to false
            expect(component.find('#kontent').length).toBe(0);
            //3) change expanded prop change the expanded to true
            component.setProps({
                expanded: true,
            })
            //4) make sure it expands + content should be rended
            expect(component.find('#kontent').length).toBe(1);

        }
        );

        it('should collapse', () => {
            //1) mount
            const component = mount(
                <CollapsibleSection
                    title={TITLE}
                    expanded={true}
                    changeExpanded={CHANGE_EXPANDED}
                >
                    <span id="kontent">{CONTENT} </span>

                </CollapsibleSection>
            );
            //2) check to make sure the content should not be rendered since expanded is set to false
            expect(component.find('#kontent').length).toBe(1);
            //3) change expanded prop change the expanded to true
            component.setProps({
                expanded: false,
            })
            //4) make sure it expands + content should be rended
            expect(component.find('#kontent').length).toBe(0);
        });
    }
);