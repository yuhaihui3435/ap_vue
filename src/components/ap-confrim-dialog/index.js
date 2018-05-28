import index from './index.vue';


let instance;

const APDialog = function (config = {}) {
  let Tpl = this.extend(index);
  instance = new Tpl();
  for (let key in config) {
    if (config[key] && config[key] != '') {
      instance.$data[key] = config[key];
    }
  }
  instance.$data.dialog = true;
  document.body.appendChild(instance.$mount().$el);
}

const Confirm = function (callback, message) {
  let confirmConfig = {
    msg: message,
    actions: [function () {
      Dismiss();
      callback && callback(false);
    }, function () {
      Dismiss();
      callback && callback(true);
    }]
  };

  APDialog.call(this, {
    ...confirmConfig
  });

}

const Dismiss = () => {
  instance.$data.dialog = false;
}

export default {
  install(Vue) {
    Vue.prototype.$APDialog = APDialog.bind(Vue);
    Vue.prototype.$APDialog.confirm = Confirm.bind(Vue);
    Vue.prototype.$APDialog['dismiss'] = Dismiss;
  }
}
