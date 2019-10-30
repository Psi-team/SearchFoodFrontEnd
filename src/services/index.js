const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(() => {
        console.log(username, '123')
        return username
      });
    }, 10);
  });
}

const userService = { login };

export { userService };