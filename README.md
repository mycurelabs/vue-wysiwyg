# Vue Wysiwyg

![npm bundle size](https://img.shields.io/bundlephobia/min/@mycure/vue-wysiwyg?style=flat-square) ![npm](https://img.shields.io/npm/v/@mycure/vue-wysiwyg?style=flat-square) ![npm](https://img.shields.io/npm/dw/@mycure/vue-wysiwyg?style=flat-square)

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
import VueWysiwyg from '@mycure/vue-wysiwyg';

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
import { McWysiwyg } from '@mycure/vue-wysiwyg';
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

### Props

**`height`** - `Number` - Sets the `min-height` of the editor container.

```html
<mc-wysiwyg v-model="html" :height="500"></mc-wysiwyg>
```

**`hide`** - `Object` - Pass the object property `hide` to hide certain features in the editor. 

**Sample**

In example below, `strikethrough` and `table` will be hidden.

```html
<template>
  <div>
    <mc-wysiwyg v-model="html" :hide="hide"></mc-wysiwyg>
  </div>
</template>

<script>
import { McWysiwyg } from '@mycure/vue-wysiwyg';
export default {
  components: {
    McWysiwyg
  },
  data () {
    return {
      html: '',
      hide: {
        strikethrough: true,
        table: true
      }
    }
  }
}
```

**`hide` Properties**

| property | type | default |
| -------- | ---- | ------- |
| bold | Boolean | false |
| italic | Boolean | false |
| underline | Boolean | false |
| strikethrough | Boolean | false |
| heading | Boolean | false |
| alignLeft | Boolean | false |
| alignCenter | Boolean | false |
| alignRight | Boolean | false |
| ol | Boolean | false |
| ul | Boolean | false |
| url | Boolean | false |
| table | Boolean | false |
| indent | Boolean | false |
| outdent | Boolean | false |

### Incoming Features

For feature request please create a [new issue](https://github.com/mycurelabs/vue-wysiwyg/issues/new).

- [ ] Add image
- [x] Height props
- [x] Configuration to show/hide features
- [ ] Custom font
- [ ] Paragraph
- [ ] Quote
- [ ] Code
- [ ] Custom HTML