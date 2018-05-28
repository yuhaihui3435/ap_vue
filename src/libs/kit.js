import store from '../store/index'
let kit = {
  msg: {

  },
  inputRules: {
    required: (value) => !!value || '必填',
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'e-mail格式错误'
    },
    digital:(val)=>{
      const pattern=/^[0-9]*$/
      return (!!!val||pattern.test(val)) || '必须是数字' 
    }
  }
};

kit.title = function (title) {
  title = title || '应用程序';
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

kit.msg.ok = function (msg) {
  let data = {
    y: 'top',
    mode: 'multi-line',
    color: 'success',
    timeout: 3000,
    text: msg,
    show: true,
  }

  store.commit('setSnackbar', data);

}

kit.msg.info = function (msg) {
  let data = {
    y: 'top',
    mode: 'multi-line',
    color: 'info',
    timeout: 3000,
    text: msg,
    show: true,
  }

  store.commit('setSnackbar', data);

}

kit.msg.err = function (msg) {
  let data = {
    y: 'top',
    mode: 'multi-line',
    color: 'error',
    timeout: 3000,
    text: msg,
    show: true,
  }

  store.commit('setSnackbar', data);

}

export default kit
