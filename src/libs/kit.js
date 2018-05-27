import store from '../store/index'
let kit = {
  msg:{
    
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

kit.msg.ok=function(msg){
  let data={
    y:'top',
    mode:'multi-line',
    color:'success',
    timeout:3000,
    text:msg,
    show:true,
  }

  store.commit('setSnackbar',data);

}

kit.msg.info=function(msg){
  let data={
    y:'top',
    mode:'multi-line',
    color:'info',
    timeout:3000,
    text:msg,
    show:true,
  }

  store.commit('setSnackbar',data);

}

kit.msg.err=function(msg){
  let data={
    y:'top',
    mode:'multi-line',
    color:'error',
    timeout:3000,
    text:msg,
    show:true,
  }

  store.commit('setSnackbar',data);

}

export default kit
