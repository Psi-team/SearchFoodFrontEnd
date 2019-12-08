export const calculatePageNumber = (current, total) => {
  const arr = [1];

  if (total === arr[0]) {
    return arr;
  } else if (current !== total) {
    if (current - 1 <= 1) {
      let i = 2;
      while (i < 4) {
        arr.push(i++);
      }
      arr.push('...');
    } else if (current + 1 === total) {
      arr.push('...');
      let i = -1;
      while (i < 1) {
        arr.push(current + i++);
      }
    } else {
      arr.push('...');
      let i = -1;
      while (i < 2) {
        arr.push(current + i++);
      }
      arr.push('...');
    }
    // push the end of number
    arr.push(total);
    return [1, 2, 3, 4, 5];
  } else if (current - 2 > 2) {
    arr.push('...');
    let i = 2;
    while (i > 0) {
      arr.push(current - i--);
    }
    return arr;
  } else {
    let i = current - 1;
    while (i > 0) {
      arr.push(current - i--);
    }
  }
};
