import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSuburb, updateCapacity, updateBudget, updateScaleBy, updateYear, updateDays, updateQuality } from '../actions/app';
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

const yearsList = createOptionsFromJSON('YEAR');
const yearsFilter = createFilterOptions({ options: yearsList });

const locationsList = createOptionsFromJSON('SA3_name');
const locationsFilter = createFilterOptions({ options: locationsList });

const budgetsList = [
    {value: 50, label: 50},
    {value: 100, label: 100},
    {value: 150, label: 150},
    {value: 200, label: 200},
    {value: 250, label: 250},
    {value: 300, label: 300},
    {value: 350, label: 350},
    {value: 400, label: 400},
    {value: 450, label: 450},
    {value: 500, label: 500},
    {value: 550, label: 550},
    {value: 600, label: 600}
];
const budgetsFilter = createFilterOptions({ options: locationsList });

const daysList = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5},
];
const daysFilter = createFilterOptions({ options: daysList });

const qualityList = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5},
];
const qualityFilter = createFilterOptions({ options: qualityList });

const scaleBy = [
    { value: regionScaleBy.POP_CHILD, label: 'Children Population (age 0-4)' },
    { value: regionScaleBy.AVAILIBILITY, label: 'Childcare capacity (number of kids)' },
    { value: regionScaleBy.SERVICE_CENTER, label: 'Number of Childcare centre' },
    { value: regionScaleBy.FEE_DAY, label: 'Average fee by day' },
    { value: regionScaleBy.INCOME_DAY, label: 'Household Income per day' },
    { value: regionScaleBy.CAPACITY_RATIO, label: 'Capacity Ratio' },
    { value: regionScaleBy.UNPAID_CHILDCARE_RATIO, label: 'Unpaid childcare ratio' },
    { value: regionScaleBy.UNPAID_CHILDCARE, label: 'Number of children not in childcare' },
];


class Sidebar extends React.Component {
    handleScaleByChange = (val) => {
        return this.props.updateScaleByDispatch(val.value);
    }

    handleYearChange = (val) => {
        return this.props.updateYearDispatch(val.value);
    }

    selectLocation = (val) => {
        return this.props.updateSuburbDispatch(val.value);
    }

    handleBudgetChange = (val) => {
        return this.props.updateBudgetDispatch(val.value);
    }

    handleDaysChange = (val) => {
        return this.props.updateDaysDispatch(val.value);
    }

    handleQualityChange = (val) => {
        return this.props.updateQualityDispatch(val.value);
    }

    logChange = (val) => {
        console.log(val)
    }

    render() {
        const { suburb, year, budget, days, quality } = this.props;
        return (
            <aside className='sidebar'>
                <section className='sidebar__section section-region'>
                    <label>
                        <h3>Year:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="year"
                            value={this.props.year}
                            filterOptions={yearsFilter}
                            options={yearsList}
                            onChange={this.handleYearChange}
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
                        <h3>Location:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="location"
                            value={suburb}
                            filterOptions={locationsFilter}
                            options={locationsList}
                            onChange={this.selectLocation}
                            placeholder='Select location...'
                        />
                    </label>
                    <label>
                        <h3>Budget:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="budget"
                            value={budget}
                            filterOptions={budgetsFilter}
                            options={budgetsList}
                            onChange={this.handleBudgetChange}
                            placeholder='Set budget...'
                        />
                    </label>
                    <label>
                        <h3>Days per week:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="days"
                            value={days}
                            filterOptions={daysFilter}
                            options={daysList}
                            onChange={this.handleDaysChange}
                            placeholder='Days enrolled per week...'
                        />
                    </label>
                    <label>
                        <h3>Min. Quality:</h3>
                        <VirtualizedSelect
                            autoBlur={true}
                            clearable={false}
                            name="quality"
                            value={quality}
                            filterOptions={qualityFilter}
                            options={qualityList}
                            onChange={this.handleQualityChange}
                            placeholder='Set quality...'
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
        capacity: store.app.capacity,
        budget: store.app.budget,
        scaleBy: store.app.scaleBy,
        year: store.app.year,
        days: store.app.days,
        quality: store.app.quality,
    }
}

const mapDispatchToProps = {
    updateScaleByDispatch: updateScaleBy,
    updateYearDispatch: updateYear,
    updateSuburbDispatch: updateSuburb,
    updateCapacityDispatch: updateCapacity,
    updateBudgetDispatch: updateBudget,
    updateDaysDispatch: updateDays, 
    updateQualityDispatch: updateQuality
}

Sidebar.defaultProps = {
    suburb: 'Sydney Inner City',
    capacity: 1000,
    budget: 1000,
    year: 2016,
    days: 5,
    quality: 0
}

Sidebar.propTypes = {
    suburb: PropTypes.string,
    capacity: PropTypes.number,
    budget: PropTypes.number,
    year: PropTypes.number,
    days: PropTypes.number,
    quality: PropTypes.number,
    dispatch: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)