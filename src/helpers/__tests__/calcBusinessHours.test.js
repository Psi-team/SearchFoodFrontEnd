import { calcBusinessHours } from '../calcBusinessHours';

beforeAll(() => {
  // Lock Time
  jest.spyOn(Date, 'now').mockImplementation(() => new Date('2019-12-12T16:00:00').valueOf());
});

afterAll(() => {
  // Unlock Time
  jest.spyOn(Date, 'now').mockRestore();
});

describe('Beyond store opening hours', () => {
  it('open the next day', () => {
    const store1 = {
      星期一: '09:30-15:30',
      星期二: '09:30-15:30',
      星期三: '09:30-15:30',
      星期四: '09:30-15:30',
      星期五: '09:30-18:30',
      星期六: 'off',
      星期日: 'off',
    };
    const result1 = calcBusinessHours(store1);
    expect(result1).toBe('隔天09:30開始營業');

    const store2 = {
      星期一: '09:30-15:30',
      星期二: '09:30-15:30',
      星期三: '09:30-15:30',
      星期四: '09:30-15:30',
      星期五: '18:30-21:30',
      星期六: 'off',
      星期日: 'off',
    };
    const result2 = calcBusinessHours(store2);
    expect(result2).toBe('隔天18:30開始營業');
  });

  it('closed the next day', () => {
    const store1 = {
      星期一: '09:30-15:30',
      星期二: '09:30-15:30',
      星期三: '09:30-15:30',
      星期四: '09:30-15:30',
      星期五: 'off',
      星期六: '06:00-12:00',
      星期日: 'off',
    };
    const result1 = calcBusinessHours(store1);
    expect(result1).toBe('星期六06:00開始營業');

    const store2 = {
      星期一: '09:30-15:30',
      星期二: '09:30-15:30',
      星期三: '09:30-15:30',
      星期四: '09:30-15:30',
      星期五: 'off',
      星期六: 'off',
      星期日: 'off',
    };
    const result2 = calcBusinessHours(store2);
    expect(result2).toBe('星期一09:30開始營業');
  });
});

describe('open now', () => {
  it('open now and open later', () => {
    const store1 = {
      星期一: '09:30-15:30',
      星期二: '09:30-15:30',
      星期三: '09:30-15:30',
      星期四: '09:30-21:30',
      星期五: '09:30-18:30',
      星期六: 'off',
      星期日: 'off',
    };
    const result1 = calcBusinessHours(store1);
    expect(result1).toBe('營業至21:30');

    const store2 = {
      星期一: '09:30-15:30',
      星期二: '09:30-15:30',
      星期三: '09:30-15:30',
      星期四: '18:30-21:30',
      星期五: '18:30-21:30',
      星期六: 'off',
      星期日: 'off',
    };
    const result2 = calcBusinessHours(store2);
    expect(result2).toBe('18:30開始營業');
  });
});

describe('no day open', () => {
  it('every day is off', () => {
    const store = {
      星期一: 'off',
      星期二: 'off',
      星期三: 'off',
      星期四: 'off',
      星期五: 'off',
      星期六: 'off',
      星期日: 'off',
    };
    const result = calcBusinessHours(store);
    expect(result).toBe('停止營業');
  });
});
