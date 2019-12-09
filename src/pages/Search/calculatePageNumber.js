export const calculatePageNumber = (current, total) => {
  const arr = [];

  // 因為會抓current前後各1，以及total前一個，因此current +1 +1 < total -1
  if (current > 3 + total - current || current + 3 < total) {
    let i = current === 1 ? 0 : current === total ? -2 : -1;
    do {
      arr.push(current + i++);
    } while (arr.length < 3);

    if (arr[0] === 1) {
      arr.push('...', total - 1, total);
    } else if (arr[2] === total) {
      arr.unshift(1, 2, '...');
    } else {
      if (arr[0] > 3) {
        arr.unshift(1, 2, '...');
      } else {
        let i = 1;
        do {
          arr.unshift(i++);
        } while (i < arr[i - 1]);
      }

      if (arr[arr.length - 1] < total - 2) {
        arr.push('...', total - 1, total);
      } else {
        let i = total - arr[arr.length - 1];
        do {
          arr.push(total - i--);
        } while (i > 0);
      }
    }
  } else {
    let i = 1;
    do {
      arr.push(i++);
    } while (i < total + 1);
  }

  return arr.sort((a, b) => {
    if (!isNaN(a) && !isNaN(b)) {
      return a > b ? 1 : -1;
    } else {
      return 0;
    }
  });
};
