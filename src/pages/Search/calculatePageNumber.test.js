import { calculatePageNumber } from './calculatePageNumber';

it('test the pageNumber equals 1', () => {
  const result = calculatePageNumber(1, 1);
  expect(result).toEqual([1]);
});

it('test the pageNumber is less than 6', () => {
  const result = calculatePageNumber(2, 5);
  expect(result).toEqual([1, 2, 3, 4, 5]);
});

it('test the pageNumber equals to current number, and also equal to 1', () => {
  const result = calculatePageNumber(1, 8);
  expect(result).toEqual([1, 2, 3, '...', 7, 8]);
});

it('test the pageNumber equals to current number, and also equal to the length of the data', () => {
  const result = calculatePageNumber(10, 10);
  expect(result).toEqual([1, 2, '...', 8, 9, 10]);
});

it('test the current number is diffierent to the pageNumber', () => {
  const result1 = calculatePageNumber(6, 20);
  expect(result1).toEqual([1, '...', 5, 6, 7, '...', 20]);
  const result2 = calculatePageNumber(3, 29);
  expect(result2).toEqual([1, 2, 3, 4, '...', 29]);
});
