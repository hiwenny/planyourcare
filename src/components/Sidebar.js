import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateScaleBy } from '../actions/app';
import '../scss/sidebar.scss';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import SA3 from '../data/SA3.json';
import { regionScaleBy } from '../data/sa3_data';

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
    handleScaleByChange = (val) => {
        console.log("changeed va;", val)
        const { dispatch } = this.props;
        this.props.updateScaleByDispatch(val.value);
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
                            value={this.props.scaleBy}
                            options={scaleBy}
                            onChange={this.handleScaleByChange}
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
      scaleBy: store.app.scaleBy,
    // suburb: store.app.suburb,
  }
}

const mapDispatchToProps = {
    updateScaleByDispatch: updateScaleBy,
}

Sidebar.defaultProps = {
//   suburb: 'Sydney',
}

Sidebar.propTypes = {
//   suburb: PropTypes.string,
  dispatch: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)