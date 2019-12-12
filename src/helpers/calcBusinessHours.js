const WEEKENUMERATION = Object.freeze({
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
});

function findNotOffDay(timeObject, dayNumber) {
  let tmp = dayNumber === 6 ? 0 : dayNumber + 1;

  let i = 1;
  while (timeObject[WEEKENUMERATION[tmp]] === 'off' && i < 8) {
    tmp = tmp === 6 ? 0 : tmp + 1;
    i++;
  }

  if (i === 8) {
    return '停止營業';
  } else if (i === 1) {
    return `隔天${timeObject[WEEKENUMERATION[tmp]].split('-')[0]}開始營業`;
  } else {
    return `${WEEKENUMERATION[tmp]}${timeObject[WEEKENUMERATION[tmp]].split('-')[0]}開始營業`;
  }
}

export const calcBusinessHours = timeObject => {
  const today = new Date(Date.now());
  const day = today.getDay(); // 0 is sunday, 6 is staturday
  const time = today.toLocaleTimeString('zh-TW', { hour12: false });

  const storeTodayBusinessHours = timeObject[WEEKENUMERATION[day]];
  const [start, end] = storeTodayBusinessHours.split('-');
  if (storeTodayBusinessHours === 'off' || end < time) {
    return findNotOffDay(timeObject, day);
  } else if (start > time) {
    return `${start}開始營業`;
  } else {
    return `營業至${storeTodayBusinessHours.split('-')[1]}`;
  }
};
