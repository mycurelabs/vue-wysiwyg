# Vue Wysiwyg

![npm bundle size](https://img.shields.io/bundlephobia/min/@mycure/vue-wysiwyg?style=flat-square)

A simple wysiwyg editor for Vue.js by [MYCURE Inc.](https://mycure.md)

**[Demo](https://mycurelabs.github.io/vue-wysiwyg/)**

### Install

**NPM**

```bash
$ npm install @mycure/vue-wysiwyg
```

**Yarn**

```bash
$ yarn add @mycure/vue-wysiwyg
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://unpkg.com/@mycure/vue-wysiwyg/dist/mc-wysiwyg.js"></script>
<script>
  Vue.use(McWysiwyg.default);
  new Vue({
    el: '#app',
  });
</script>
```

### Usage

**As a global plugin**
```javascript
import Vue from 'vue';
import VueWysiwyg from '@mycure/wysiwyg';

Vue.use(VueWysiwyg);
```

**As a local component**
```html
<template>
  <div>
    <mc-wysiwyg v-model="html"></mc-wysiwyg>
  </div>
</template>

<script>
import { McWysiwyg } from '@mycure/wysiwyg';
export default {
  components: {
    McWysiwyg
  },
  data () {
    return {
      html: ''
    }
  }
}
</script>
```