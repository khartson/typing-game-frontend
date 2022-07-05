import { faker } from '@faker-js/faker';

export const generate = (count = 10) => {
    console.log('called generate')

    return new Array(count)
    .fill()
    .map(_=>faker.random.word().toLowerCase())
    .join(' ');
}

export const wpmCalculator = ({length, startTime, endTime, correctChar}) => {
    const words  = length / 5;
    const time   = (endTime - startTime) / 60000;
    const errors = (length - correctChar) / 5;
    const wpm    = (words - errors) / time;
    return parseFloat(wpm.toFixed(2)); 
}