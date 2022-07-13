import { faker } from '@faker-js/faker';

// generate
// uses faker library to generate text based on a selected length
// populates an empty array of specified length with randomly generated
// words, and joins them to form a stringo of text (the 'test' the user takes)
export const generate = (count = 10) => {
    console.log('called generate')

    return new Array(count)
    .fill()
    .map(_=>faker.random.word().toLowerCase())
    .join(' ');
}

// wpmCalculator 
// takes information from the typingGame hook and uses it to 
// calculate the user's NET wpm, which takes into account
// uncorrected errors, then adjusts sig. figures
export const wpmCalculator = ({length, startTime, endTime, correctChar}) => {
    const words  = length / 5;
    const time   = (endTime - startTime) / 60000;
    const errors = (length - correctChar) / 5;
    const wpm    = (words - errors) / time;
    return parseFloat(wpm.toFixed(2)); 
}