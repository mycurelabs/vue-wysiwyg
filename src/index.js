import McWysiwyg from './McWysiwyg.vue';

const Plugin = {
  install (Vue, opts) {    
    Vue.component('mc-wysiwyg', McWysiwyg);
  }
};

export { McWysiwyg };
export default Plugin;