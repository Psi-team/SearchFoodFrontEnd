class LocalDatabase {
  constructor(tableName) {
    this.tableName = tableName;
  }

  close(db) {
    if (db) {
      db.close();
    }
  }

  async open() {
    if (window.indexedDB) {
      return new Promise((resolve, reject) => {
        const open = window.indexedDB.open('food', 1);
        open.onerror = e => {
          return reject(e);
        };

        open.onsuccess = () => {
          return resolve(open.result);
        };

        open.onupgradeneeded = e => {
          // If the database does not exist or
          // the version of the database is not equal to the current version,
          // this function will be executed.
          const db = e.target.result;

          db.onerror = e => {
            return reject(e);
          };

          db.createObjectStore(this.tableName, {
            keyPath: 'storeId',
          });
        };
      });
    } else {
      alert('indexedDB does not exist, can not store data in local');
    }
  }

  addData(db, datas, store) {
    return new Promise((resolve, reject) => {
      if (store) {
        let request = null;
        if (Array.isArray(datas)) {
          datas.forEach(data => (request = store.add(data)));
        } else {
          request = store.add(datas);
        }

        request.onerror = () => {
          return reject(
            `There has been an error with adding your data: ${request.error}`
          );
        };

        request.onsuccess = () => {
          return resolve(datas);
        };
      } else {
        const tx = db.transaction(this.tableName, 'readwrite');
        const store = tx.objectStore(this.tableName);
        if (Array.isArray(datas)) {
          datas.forEach(data => store.add(data));
        } else {
          store.add(datas);
        }

        tx.oncomplete = () => {
          return resolve(datas);
        };

        tx.onerror = () => {
          // If transaction has error, it will be rollback.
          return reject(`Transaction not opened due to error: ${tx.error}`);
        };
      }
    });
  }

  deleteData(db, datas, store) {
    return new Promise((resolve, reject) => {
      let arr = [];
      if (Array.isArray(datas)) {
        arr = datas;
      } else {
        arr.push(datas);
      }
      // check the key exist.
      if (store) {
        const getDatasPromises = arr.map(data => this.getData(db, data, store));
        Promise.all(getDatasPromises)
          .then(() => {
            let request = null;
            arr.forEach(data => (request = store.delete(data)));

            request.onerror = () => {
              return reject(
                `There has been an error with adding your data: ${request.error}`
              );
            };

            request.onsuccess = () => {
              return resolve(datas);
            };
          })
          .catch(e => reject(e));
      } else {
        const getDatasPromises = arr.map(data => this.getData(db, data));
        Promise.all(getDatasPromises)
          .then(() => {
            const tx = db.transaction(this.tableName, 'readwrite');
            const store = tx.objectStore(this.tableName);
            arr.forEach(data => store.delete(data));

            tx.onerror = e => {
              return reject(
                `There is an error ${e}, this operation will be invalid`
              );
            };

            tx.oncomplete = () => {
              return resolve(datas);
            };
          })
          .catch(e => reject(e));
      }
    });
  }

  getData(db, key, store) {
    return new Promise((resolve, reject) => {
      if (store) {
        const request = store.get(key);
        request.onsuccess = () => {
          const { result } = request;
          if (result === undefined) {
            // if key does not exist, the transaction will be continued,
            // so we need to shut down
            store.transaction.abort();
            return reject('it is not found');
          } else {
            return resolve(result);
          }
        };

        request.onerror = () => {
          return reject(
            `There has been an error with retrieving your data: ${request.error}`
          );
        };
      } else {
        const tx = db.transaction(this.tableName, 'readonly');
        const store = tx.objectStore(this.tableName);
        const request = store.get(key);

        tx.onerror = () => {
          return reject(`Transaction not opened due to error: ${tx.error}`);
        };

        request.onsuccess = () => {
          const { result } = request;
          if (result === undefined) {
            tx.abort();
            return reject('it is not found');
          } else {
            return resolve(result);
          }
        };

        request.onerror = () => {
          return reject(
            `There has been an error with retrieving your data: ${request.error}`
          );
        };
      }
    });
  }

  getDatasByKey(db) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.tableName, 'readonly');
      const store = tx.objectStore(this.tableName);
      const request = store.getAll();

      tx.onerror = () => {
        return reject(`Transaction not opened due to error: ${tx.error}`);
      };

      request.onsuccess = async () => {
        return resolve(request.result);
      };

      request.onerror = () => {
        return reject(
          `There has been an error with retrieving your data: ${request.error}`
        );
      };
    });
  }

  getDatasByIndex(db, indexName) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.tableName, 'readwrite');
      const store = tx.objectStore(this.tableName);

      try {
        const index = store.index(indexName);
        const request = index.getAll();

        request.onsuccess = async () => {
          const timestamp = await this.getTimestamp(db);
          return resolve({
            data: request.result,
            timestamp,
          });
        };

        request.onerror = () => {
          return reject(
            `There has been an error with retrieving your data: ${request.error}`
          );
        };
      } catch (e) {
        return reject(`There has been an error with open your index: ${e}`);
      }

      tx.onerror = () => {
        return reject(`Transaction not opened due to error: ${tx.error}`);
      };
    });
  }
}

export const addData = async (dataType, data) => {
  const instance = new LocalDatabase(dataType);
  const db = await instance.open();
  return instance.addData(db, data);
};

export const getDatas = async dataType => {
  const instance = new LocalDatabase(dataType);
  const db = await instance.open();
  return instance.getDatasByKey(db);
};

export const removeData = async (dataType, data) => {
  const instance = new LocalDatabase(dataType);
  const db = await instance.open();
  return instance.deleteData(db, data);
};
