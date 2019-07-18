module.exports = callback => {
  let result = 0;

  setTimeout(() => {
    result = 1;
    callback(result);
  }, 1500);
};
