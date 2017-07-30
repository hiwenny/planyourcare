import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSuburb, updateCapacity, updateBudget, updateYear } from '../actions/app';
import '../scss/sidebar.scss';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import SA3 from '../data/SA3.json';

const createOptionsFromJSON = (keyName, valueName) => {
    if (!valueName) valueName = keyName;

    const optionsMap = new Map(
        SA3.map((i) => [i[keyName], i[valueName]])
    );

    const options = Array.from(optionsMap.keys()).map(x => {
        return { value: x, label: x };
    });

    return options;
}

const years = createOptionsFromJSON('YEAR');
const yearsFilter = createFilterOptions({ options: years });

const locations = createOptionsFromJSON('SA3_name');
const locationsFilter = createFilterOptions({ options: locations });

const regionScaleBy = {
    POP_CHILD: 'POP_CHILD',
    AVAILIBILITY: 'AVAILIBILITY',
    INCOME_DAY: 'INCOME_DAY',
    SERVICE_CENTER: 'SERVICE_CENTER',
    FEE_DAY: 'FEE_DAY',
};

const scaleBy = [
    { value: regionScaleBy.POP_CHILD, label: 'Children Population (age 0-4)' },
    { value: regionScaleBy.AVAILIBILITY, label: 'Childcare capacity (number of kids)' },
    { value: regionScaleBy.SERVICE_CENTER, label: 'Number of Childcare centre' },
    { value: regionScaleBy.FEE_DAY, label: 'Average fee by day' },
    { value: regionScaleBy.INCOME_DAY, label: 'Household Income per day' },
];

function logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
}

class Sidebar extends React.Component {
    componentDidMount() {
        const { suburb, capacity, year, budget } = this.props;
        console.log('sub '+suburb)
        console.log('cap '+capacity)
        console.log('yr '+year)
        console.log('budget '+budget)
    }
    render() {
        return (
            <aside className='sidebar'>
                <section className='sidebar__section section-region'>
                    <label>
                        <h3>Year:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="year"
                            value={'one'}
                            filterOptions={yearsFilter}
                            options={years}
                            onChange={logChange}
                            placeholder='Select year...'
                        />
                    </label>
                    <label>
                        <h3>Scale by:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="scaleby"
                            value={'one'}
                            options={scaleBy}
                            onChange={logChange}
                            placeholder='Select scale by...'
                        />
                    </label>
                </section>
                <section className='sidebar__section section-childcare'>
                    <label>
                        <h3>Locations:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="year"
                            value={'one'}
                            filterOptions={locationsFilter}
                            options={locations}
                            onChange={logChange}
                            placeholder='Select locations...'
                        />
                    </label>
                </section>
            </aside>
        );
    }
}

function mapStateToProps(store) {
  return {
    suburb: store.app.suburb,
  }
}


Sidebar.defaultProps = {
  suburb: 'Sydney',
  capacity: null,
  budget: null,
  year: null
}

Sidebar.propTypes = {
  suburb: PropTypes.string,
  capacity: PropTypes.string,
  budget: PropTypes.string,
  year: PropTypes.string,
  dispatch: PropTypes.func,
}
export default connect(mapStateToProps)(Sidebar)