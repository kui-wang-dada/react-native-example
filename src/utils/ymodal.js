// 弹出层的调用方法
// 当前仅涉及到YModal
let instances = null;

export default {
  setInstance(ref) {
    instances = ref;
  },
  show(component, type) {
    instances.show(component, type);
  },
  showToast(component, func) {
    instances.showToast(component, func);
  },
  close() {
    instances.close();
  },
};
