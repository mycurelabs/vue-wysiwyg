<template>
  <div>
    <div id="container">
      <div id="toolbar">
        <div class="toolbar-section">
          <button v-if="!hide.bold" class="wysiwyg-button" :class="isBold ? 'wysiwyg-button-active' : ''" @click="bold">
            <format-bold></format-bold>
          </button>
          <button v-if="!hide.italic" class="wysiwyg-button" :class="isItalic ? 'wysiwyg-button-active' : ''" @click="italize">
            <format-italic></format-italic>
          </button>
          <button v-if="!hide.underline" class="wysiwyg-button" :class="isUnderlined ? 'wysiwyg-button-active' : ''" @click="underline">
            <format-underline></format-underline>
          </button>
          <button v-if="!hide.strikethrough" class="wysiwyg-button" :class="isStrikedThrough ? 'wysiwyg-button-active' : ''" @click="strikeThrough">
            <format-strikethrough></format-strikethrough>
          </button>
          <button v-if="!hide.heading" class="wysiwyg-button" :class="isHeading ? 'wysiwyg-button-active' : ''" @click="showHeadings">
            <format-header-1></format-header-1>
          </button>
        </div>
        <div class="toolbar-section">
          <button v-if="!hide.alignLeft" class="wysiwyg-button" :class="isAlignedLeft ? 'wysiwyg-button-active' : ''" @click="alignLeft">
            <format-align-left></format-align-left>
          </button>
          <button v-if="!hide.alignCenter" class="wysiwyg-button" :class="isAlignedCenter ? 'wysiwyg-button-active' : ''" @click="alignCenter">
            <format-align-center></format-align-center>
          </button>
          <button v-if="!hide.alignRight" class="wysiwyg-button" :class="isAlignedRight ? 'wysiwyg-button-active' : ''" @click="alignRight">
            <format-align-right></format-align-right>
          </button>
          <button v-if="!hide.ol" class="wysiwyg-button" @click="orderedList">
            <format-list-numbered></format-list-numbered>
          </button>
          <button v-if="!hide.ul" class="wysiwyg-button" @click="insertUnorderedList">
            <format-list-bulleted></format-list-bulleted>
          </button>
        </div>
        <div class="toolbar-section">
          <button v-if="!hide.url" class="wysiwyg-button" :class="showLinkForm ? 'wysiwyg-button-active' : ''" @click="showLinkOptions">
            <b style="font-size: 10px;">URL</b>
          </button>
          <button v-if="!hide.table" class="wysiwyg-button" :class="showTableForm ? 'wysiwyg-button-active' : ''" @click="showTableOptions">
            <table-large></table-large>
          </button>
          <button v-if="!hide.indent" class="wysiwyg-button" @click="indent">
            <format-indent-increase></format-indent-increase>
          </button>
          <button v-if="!hide.outdent" class="wysiwyg-button" @click="outdent">
            <format-indent-decrease></format-indent-decrease>
          </button>
        </div>
      </div>
      <!-- OPTIONS -->
      <div v-if="showHeadingOptions" id="toolbar-options">
        <button class="wysiwyg-button wysiwyg-button-loop" v-for="size in hSizes" :key="size" @click="heading(size)">{{size}}</button>
      </div>
      <div v-if="showLinkForm" id="toolbar-options">
        <form @submit.prevent="createLink">
          <input v-model="linkText" type="text" placeholder="Link Text" required/>
          <input v-model="linkURL" type="text" placeholder="URL" required/>
          <button type="submit" class="wysiwyg-button">Insert</button>
          <button @click="linkText = ''; linkURL = ''" class="wysiwyg-button">Clear</button>
        </form>
      </div>
      <div v-if="showTableForm" id="toolbar-options">
        <form @submit.prevent="createTable">
          <input v-model="rows" type="number" placeholder="Rows" required/>
          <input v-model="cols" type="number" placeholder="Columns" required/>
          <button type="submit" class="wysiwyg-button">Insert</button>
          <button @click="rows = null; cols = null" class="wysiwyg-button">Clear</button>
        </form>
      </div>
      <div id="body">
        <div id="editor" contenteditable></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-material-design-icons/styles.css';
import FormatAlignCenter from 'vue-material-design-icons/FormatAlignCenter.vue';
import FormatAlignLeft from 'vue-material-design-icons/FormatAlignLeft.vue';
import FormatAlignRight from 'vue-material-design-icons/FormatAlignRight.vue';
import FormatBold from 'vue-material-design-icons/FormatBold.vue';
import FormatHeader1 from 'vue-material-design-icons/FormatHeader1.vue';
import FormatIndentDecrease from 'vue-material-design-icons/FormatIndentDecrease.vue';
import FormatIndentIncrease from 'vue-material-design-icons/FormatIndentIncrease.vue';
import FormatItalic from 'vue-material-design-icons/FormatItalic.vue';
import FormatListBulleted from 'vue-material-design-icons/FormatListBulleted.vue';
import FormatListNumbered from 'vue-material-design-icons/FormatListNumbered.vue';
import FormatStrikethrough from 'vue-material-design-icons/FormatStrikethrough.vue';
import FormatUnderline from 'vue-material-design-icons/FormatUnderline.vue';
import TableLarge from 'vue-material-design-icons/TableLarge.vue';

export default {
  components: {
    FormatAlignCenter,
    FormatAlignLeft,
    FormatAlignRight,
    FormatBold,
    FormatHeader1,
    FormatIndentDecrease,
    FormatIndentIncrease,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatStrikethrough,
    FormatUnderline,
    TableLarge
  },
  props: {
    value: {
      type: String
    },
    hide: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isBold: false,
      isItalic: false,
      isUnderlined: false,
      isStrikedThrough: false,
      isHeading: false,
      isAlignedLeft: false,
      isAlignedCenter: false,
      isAlignedRight: false,
      showToolbarOptions: false,
      showHeadingOptions: false,
      showLinkForm: false,
      linkText: '',
      linkURL: '',
      showTableForm: false,
      rows: null,
      cols: null
    };
  },
  computed: {
    hSizes () {
      let sizes = [];
      for(let x = 1; x <= 6; x++) {
        sizes.push(`H${x}`);
      }
      sizes.push('Clear');
      return sizes;
    }
  },
  methods: {
    bold () {
      this.isBold = !this.isBold;
      this.exec('bold');
    },
    italize () {
      this.isItalic = !this.isItalic;
      this.exec('italic');
    },
    underline () {
      this.isUnderlined = !this.isUnderlined;
      this.exec('underline');
    },
    strikeThrough () {
      this.isStrikedThrough = !this.isStrikedThrough;
      this.exec('strikeThrough');
    },
    heading (size) {
      this.exec('formatBlock', false, size === 'Clear' ? 'p' : size);
    },
    showHeadings () {
      this.isHeading = !this.isHeading;
      this.showHeadingOptions = !this.showHeadingOptions;
    },
    alignLeft () {
      this.isAlignedLeft = !this.isAlignedLeft;
      this.exec('justifyLeft');
    },
    alignCenter () {
      this.isAlignedCenter = !this.isAlignedCenter;
      this.exec('justifyCenter');
    },
    alignRight () {
      this.isAlignedRight = !this.isAlignedRight;
      this.exec('justifyRight');
    },
    showLinkOptions () {
      this.showLinkForm = !this.showLinkForm;
    },
    createLink () {
      let selected = document.getSelection();
      if (selected.anchorOffset === selected.extentOffset) 
        selected = this.linkText;
      this.exec('insertHTML', false, `<a href='${this.linkURL}'>${selected}</a>`);
    },
    orderedList () {
      this.exec('insertOrderedList');
    },
    insertUnorderedList () {
      this.exec('insertUnorderedList');
    },
    showTableOptions () {
      this.showTableForm = !this.showTableForm;
    },
    generageTable (rows, cols) {
      let text = '';
      for (let row = 1; row <= rows; row++) {
        text += `<tr>`;
        for (let col = 1; col <= cols; col++) {
          text += `<td style="border: 1px solid lightgrey; padding: 2px;"></td>`;
        }
        text += `</tr>`;
      }
      return text;
    },
    createTable () {
      let table = `
        <table width="100%" style="border-collapse: collapse; border: 1px solid lightgrey;">
          <tbody>
            ${this.generageTable(this.rows, this.cols)}
          </tbody>
        </table>
      `;
      this.exec('insertHTML', false, table);
    },
    indent () {
      this.exec('indent');
    },
    outdent () {
      this.exec('outdent');
    },
    exec (...args) {
      document.execCommand(...args);
    },
    getValue () {
      this.$emit('input', document.getElementById('editor').innerHTML);
    }
  },
  created () {
    if (this.value) {
      setTimeout(() => {
        document.getElementById('editor').innerHTML = this.value;
      }, 100);
    }
  },
  mounted () {
    let that = this;
    this.$nextTick(() => {
      document.getElementById('editor').addEventListener('input', function() {
        that.getValue();
      }, false);
    });
  },
}
</script>

<style scoped>
input {
  margin: 4px;
  padding: 2px;
  border: 1px solid lightgrey;
}

input:focus {
  outline: none;
}

#container {
  border: 1px solid lightgrey;
}

#body {
  height: 400px;
  overflow: auto;
}

#toolbar {
  min-height: 29px;
  border-bottom: 1px solid lightgrey;
  background-color: rgb(247, 247, 247);
}

#toolbar-options {
  min-height: 29px;
  border-bottom: 1px solid lightgrey;
}

#editor {
  min-height: 400px;
  padding: 10px;
}

#editor:focus {
  outline: none;
}

.toolbar-section {
  float: left;
  border-right: 1px solid lightgrey;
}

.wysiwyg-button {
  height: 28px;
  min-width: 30px;
  background-color: transparent;
  text-align: center;
  padding: 2px;
}

.wysiwyg-button:hover {
  background-color: lightblue;
}

.wysiwyg-button-active {
  background-color: lightblue;
}

.wysiwyg-button-loop {
  margin-right: 4px;
}
</style>