import SA3 from '../data/SA3.json';

const regionScaleBy = {
    POP_CHILD: 'POP_CHILD',
    AVAILIBILITY: 'AVAILIBILITY',
    INCOME_DAY: 'INCOME_DAY',
    SERVICE_CENTER: 'SERVICE_CENTER',
    FEE_DAY: 'FEE_DAY',
};

// FOR FILTERING COLORS
const scaleSmallestLargest = {}
const createSmallestLargest = (numbers) => {
    return {
        smallest: Math.min(...numbers),
        largest: Math.max(...numbers),
    }
}

Object.values(regionScaleBy).forEach((val) => {
    const numbers = SA3.map(x => x[val])
    scaleSmallestLargest[val] = createSmallestLargest(numbers)
})

export {
    regionScaleBy,
}
