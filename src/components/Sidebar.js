import React from 'react';
import '../scss/sidebar.scss';
import Select from 'react-select';
import SA3 from '../data/SA3.json';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

function logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
}

export default class Sidebar extends React.Component {
    render() {
        return (
            <aside className='sidebar'>
                <label>
                    Year
                    <Select
                        name="form-field-name"
                        value="one"
                        options={options}
                        onChange={logChange}
                    />
                </label>
            </aside>
        );
    }
}
