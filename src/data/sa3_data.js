import SA3 from '../data/SA3.json';

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
