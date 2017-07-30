import SA3 from '../data/SA3.json';

const regionScaleBy = {
    POP_CHILD: 'POP_CHILD',
    AVAILIBILITY: 'AVAILIBILITY',
    INCOME_DAY: 'INCOME_DAY',
    SERVICE_CENTER: 'SERVICE_CENTER',
    FEE_DAY: 'FEE_DAY',
    CAPACITY_RATIO: 'CAPACITY_RATIO',
    UNPAID_CHILDCARE_RATIO: 'UNPAID_CHILDCARE_RATIO',
    UNPAID_CHILDCARE: 'UNPAID_CHILDCARE',
};

// FOR FILTERING COLORS
let scaleSmallestLargest = {}
const createSmallestLargest = (numbers) => {
    return {
        smallest: Math.min(...numbers),
        largest: Math.max(...numbers),
    }
}

SA3.forEach((data) => {
    Object.keys(data).forEach(key => {
        const scaleKey = `${key}_${data['YEAR']}`;
        
        if (!(scaleKey in scaleSmallestLargest)) {
            scaleSmallestLargest[scaleKey] = {
                smallest: Number.MAX_VALUE,
                largest: -1,
            };
        }

        if (scaleSmallestLargest[scaleKey].smallest > data[key]) {
            scaleSmallestLargest[scaleKey].smallest = data[key]
        }

        if (scaleSmallestLargest[scaleKey].largest < data[key]) {
            scaleSmallestLargest[scaleKey].largest = data[key]
        }
    })
})

const sa3ByRegionYear = {};

SA3.forEach((x) => {
    const key = `${x['SA3_name']}_${x['YEAR']}`
    sa3ByRegionYear[key] = x
});

export {
    regionScaleBy,
    sa3ByRegionYear,
    scaleSmallestLargest,
}
