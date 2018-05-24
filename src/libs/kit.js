let kit = {

};

kit.title = function (title) {
  title = title || 'MYBANK代收付系统控制台';
  window.document.title = title;
};

kit.inOf = function (arr, targetArr) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

kit.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};
