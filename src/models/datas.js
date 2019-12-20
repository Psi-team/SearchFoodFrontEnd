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
  const timeArray = ['off', '06:00-12:00', '11:00-21:00'];
  for (let i = 0; i < 1000; i++) {
    data.search.push({
      storename: names[Math.floor(Math.random() * names.length)],
      location: '新北市土城區中央路四段',
      latlong: {
        經度: 121,
        緯度: 24,
      },
      businessHours: {
        星期一: timeArray[Math.round(Math.random() * 2)],
        星期二: timeArray[Math.round(Math.random() * 2)],
        星期三: timeArray[Math.round(Math.random() * 2)],
        星期四: timeArray[Math.round(Math.random() * 2)],
        星期五: timeArray[Math.round(Math.random() * 2)],
        星期六: timeArray[Math.round(Math.random() * 2)],
        星期日: timeArray[Math.round(Math.random() * 2)],
      },
      tags: ['R'],
      star: Math.random() * 5,
      tel: '0912345678',
      type: '炒飯',
      click_week: 1000,
      storeId: i,
      createdDate: `2019-${Math.round(Math.random()) + 11}-${Math.floor(
        Math.random() * 30 + 1
      )}`,
    });
  }

  data.storeDetail = {
    storename: '肯德基',
    type: ['速食', '甜點'],
    star: 3,
    slogan: '沒吃過肯德基，別說過吃過速食',
    businessHours: {
      星期一: timeArray[Math.round(Math.random() * 2)],
      星期二: timeArray[Math.round(Math.random() * 2)],
      星期三: timeArray[Math.round(Math.random() * 2)],
      星期四: timeArray[Math.round(Math.random() * 2)],
      星期五: timeArray[Math.round(Math.random() * 2)],
      星期六: timeArray[Math.round(Math.random() * 2)],
      星期日: timeArray[Math.round(Math.random() * 2)],
    },
    tel: '0912345678',
    address: '新北市板橋民族路三段',
    pictures: [
      'https://picsum.photos/id/217/800/450',
      'https://picsum.photos/id/204/800/450',
      'https://picsum.photos/id/192/800/450',
    ],
    comments: [
      {
        createUser: 'Kai',
        createDate: '2019-03-26',
        contents:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid consequatur eum voluptate debitis quaerat asperiores ratione optio in. In, dolorem expedita? Modi similique natus nemo consequuntur deleniti nisi distinctio at.',
        pictures: [
          'https://picsum.photos/id/237/800/450',
          'https://picsum.photos/id/234/800/450',
          'https://picsum.photos/id/232/800/450',
        ],
      },
    ],
  };
  return data;
};
