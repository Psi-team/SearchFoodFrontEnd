module.exports = () => {
  const data = {
    createStore: {},
    getStoreTypes: {
      飯: ['炒飯', '燴飯', '滷肉飯', '豬排飯', '三寶飯'],
      麵食: ['油麵', '義大利麵', '陽春麵', '粄條', '白麵', '拉麵'],
      速食: ['麥當勞', '肯德基', '頂呱呱', '胖老爹'],
    },
    search: [],
  };
  const names = [
    '炒飯',
    '燴飯',
    '滷肉飯',
    '豬排飯',
    '三寶飯',
    '油麵',
    '義大利麵',
    '陽春麵',
    '粄條',
    '白麵',
    '拉麵',
    '麥當勞',
    '肯德基',
    '頂呱呱',
    '胖老爹',
  ];
  for (let i = 0; i < 1000; i++) {
    data.search.push({
      storename: names[Math.floor(Math.random() * names.length)],
      location: '新北市土城區中央路四段',
      latlong: {
        經度: 121,
        緯度: 24,
      },
      businessHours: {
        星期一: '09:30-18:30',
        星期二: '09:30-18:30',
        星期三: '09:30-18:30',
        星期四: '09:30-18:30',
        星期五: '09:30-18:30',
        星期六: 'off',
        星期日: 'off',
      },
      tags: ['R'],
      star: Math.random() * 5,
      tel: '0912345678',
      type: '炒飯',
      click_week: 1000,
      storeId: i,
      createdDate: '2019-12-01',
    });
  }

  return data;
};
