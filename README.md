# Vue Wysiwyg

![npm bundle size](https://img.shields.io/bundlephobia/min/@mycure/vue-wysiwyg?style=flat-square) ![npm](https://img.shields.io/npm/v/@mycure/vue-wysiwyg?style=flat-square) ![npm](https://img.shields.io/npm/dw/@mycure/vue-wysiwyg?style=flat-square)

A fork of the [MYCURE Inc.](https://mycure.md) wysiwyg editor for Vue.js

**[Demo](https://mycurelabs.github.io/vue-wysiwyg/)**

### Install

**NPM**

```bash
$ npm install @wakeio/vue-wysiwyg
```

### Usage

**As a global plugin**
```javascript
import Vue from 'vue';
import wysiwyg from '@wakeio/vue-wysiwyg';

Vue.use(VueWysiwyg);
```

**As a local component**
```html
<template>
  <div>
    <wysiwyg v-model="html"></wysiwyg>
  </div>
</template>

<script>
import wysiwyg from '@wakeio/vue-wysiwyg';
export default {
  components: {
    wysiwyg
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
<wysiwyg v-model="html" :height="500"></wysiwyg>
```

**`hide`** - `Object` - Pass the object property `hide` to hide certain features in the editor. 

**Sample**

In example below, `strikethrough` and `table` will be hidden.

```html
<template>
  <div>
    <wysiwyg v-model="html" :hide="hide"></wysiwyg>
  </div>
</template>

<script>
import wysiwyg from '@wakeio/vue-wysiwyg';
export default {
  components: {
    wysiwyg
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
