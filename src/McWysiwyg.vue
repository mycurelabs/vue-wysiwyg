<template>
  <div>
    <div id="container">
      <div id="toolbar">
        <div class="toolbar-section">
          <button v-if="!hide.bold" class="wysiwyg-button" :class="isBold ? 'wysiwyg-button-active' : ''" @click.prevent="bold">
            <format-bold></format-bold>
          </button>
          <button v-if="!hide.italic" class="wysiwyg-button" :class="isItalic ? 'wysiwyg-button-active' : ''" @click.prevent="italize">
            <format-italic></format-italic>
          </button>
          <button v-if="!hide.underline" class="wysiwyg-button" :class="isUnderlined ? 'wysiwyg-button-active' : ''" @click.prevent="underline">
            <format-underline></format-underline>
          </button>
          <button v-if="!hide.strikethrough" class="wysiwyg-button" :class="isStrikedThrough ? 'wysiwyg-button-active' : ''" @click.prevent="strikeThrough">
            <format-strikethrough></format-strikethrough>
          </button>
          <button v-if="!hide.heading" class="wysiwyg-button" :class="isHeading ? 'wysiwyg-button-active' : ''" @click.prevent="showHeadings">
            <format-header-1></format-header-1>
          </button>
        </div>
        <div class="toolbar-section">
          <button v-if="!hide.alignLeft" class="wysiwyg-button" :class="isAlignedLeft ? 'wysiwyg-button-active' : ''" @click.prevent="alignLeft">
            <format-align-left></format-align-left>
          </button>
          <button v-if="!hide.alignCenter" class="wysiwyg-button" :class="isAlignedCenter ? 'wysiwyg-button-active' : ''" @click.prevent="alignCenter">
            <format-align-center></format-align-center>
          </button>
          <button v-if="!hide.alignRight" class="wysiwyg-button" :class="isAlignedRight ? 'wysiwyg-button-active' : ''" @click.prevent="alignRight">
            <format-align-right></format-align-right>
          </button>
          <button v-if="!hide.ol" class="wysiwyg-button" @click.prevent="orderedList">
            <format-list-numbered></format-list-numbered>
          </button>
          <button v-if="!hide.ul" class="wysiwyg-button" @click.prevent="insertUnorderedList">
            <format-list-bulleted></format-list-bulleted>
          </button>
        </div>
        <div class="toolbar-section">
          <button v-if="!hide.url" class="wysiwyg-button" :class="showLinkForm ? 'wysiwyg-button-active' : ''" @click.prevent="showLinkOptions">
            <b style="font-size: 10px;">URL</b>
          </button>
          <button v-if="!hide.table" class="wysiwyg-button" :class="showTableForm ? 'wysiwyg-button-active' : ''" @click.prevent="showTableOptions">
            <table-large></table-large>
          </button>
          <button v-if="!hide.indent" class="wysiwyg-button" @click.prevent="indent">
            <format-indent-increase></format-indent-increase>
          </button>
          <button v-if="!hide.outdent" class="wysiwyg-button" @click.prevent="outdent">
            <format-indent-decrease></format-indent-decrease>
          </button>
        </div>
      </div>
      <!-- OPTIONS -->
      <div v-if="showHeadingOptions" id="toolbar-options">
        <button class="wysiwyg-button wysiwyg-button-loop" v-for="size in hSizes" :key="size" @click.prevent="heading(size)">{{size}}</button>
      </div>
      <div v-if="showLinkForm" id="toolbar-options">
        <form @submit.prevent="createLink">
          <input v-model="linkText" type="text" placeholder="Link Text" required/>
          <input v-model="linkURL" type="text" placeholder="URL" required/>
          <button type="submit" class="wysiwyg-button">Insert</button>
          <button @click.prevent="linkText = ''; linkURL = ''" class="wysiwyg-button">Clear</button>
        </form>
      </div>
      <div v-if="showTableForm" id="toolbar-options">
        <form @submit.prevent="createTable">
          <input v-model="rows" min="0" type="number" placeholder="Rows" required/>
          <input v-model="cols" min="0" type="number" placeholder="Columns" required/>
          <button type="submit" class="wysiwyg-button">Insert</button>
          <button @click.prevent="rows = null; cols = null" class="wysiwyg-button">Clear</button>
        </form>
        <div class="hoverTableCont">
          <div class="hoverTable" @mouseleave="changeSelectedCell(0, 0)">
            <div class="hoverRow" v-for="(row, key) in 12" :key="key">
              <div
                v-for="(col, key) in 12" 
                :class="['hoverCell', { 'highlightCell': isHighlighted(row, col)}]" 
                @mouseover="changeSelectedCell(row, col)" 
                @click="setupCreateTable"
                :key="key"
              ></div>
            </div>
          </div>
          <br>
          <div id="tableDimmensions">
            <em v-if="noSelectedCell">Select boxes above</em>
            <em v-else>{{ this.selectedCell.cols }} x {{ this.selectedCell.rows }}</em>
          </div>
        </div>
      </div>
      <div id="body" :style="{'height': `${height}px`}">
        <div id="editor" contenteditable :style="{'min-height': `${height}px`}"></div>
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
    },
    height: {
      type: [Number, String],
      default: 400
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
      cols: null,
      selectedCell: {
        rows: 0,
        cols: 0
      },
      caratSelection: null,
      savedPosition: null
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
    },
    noSelectedCell () {
      return this.selectedCell.rows === 0 && this.selectedCell.cols === 0;
    },
  },
  watch: {
    value: {
      handler (val) {
        if (val) {
          setTimeout(() => {
            if (!document.getElementById('editor').innerHTML) {
              document.getElementById('editor').innerHTML = val;
            }
          }, 100);
        }
      },
      immediate: true
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
      if (!this.showTableForm) {
        this.caratSelection = document.getSelection();
        this.savedPosition = [ this.caratSelection.focusNode, this.caratSelection.focusOffset ];
      }
      this.showTableForm = !this.showTableForm;
    },
    generateTable (rows, cols) {
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
    setupCreateTable () {
      this.rows = this.selectedCell.rows;
      this.cols = this.selectedCell.cols;
      this.createTable();
    },
    createTable () {
      document.getElementById('editor').focus();
      this.caratSelection.collapse(this.savedPosition[0], this.savedPosition[1]);
      let table = `
        <table width="100%" style="border-collapse: collapse; border: 1px solid lightgrey;">
          <tbody>
            ${this.generateTable(this.rows, this.cols)}
          </tbody>
        </table>
      `;

      this.exec('insertHTML', false, table);
      this.showTableForm = false;
      this.caratSelection = null;
      this.savedPosition = null;
    },
    indent () {
      this.exec('indent');
    },
    outdent () {
      this.exec('outdent');
    },
    changeSelectedCell (row, col) {
      this.selectedCell.rows = row;
      this.selectedCell.cols = col;
    },
    isHighlighted (row, col) {
      if (this.noSelectedCell ) return false;
      if (row <= this.selectedCell.rows && col <= this.selectedCell.cols ) return true;
      return false;
    },
    exec (...args) {
      document.execCommand(...args);
    },
    getValue () {
      this.$emit('input', document.getElementById('editor').innerHTML);
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
  overflow: auto;
  display: inline-block;
  width: 100%
}

#editor {
  padding: 10px;
}

#toolbar {
  min-height: 29px;
  border-bottom: 1px solid lightgrey;
  background-color: rgb(247, 247, 247);
}

#toolbar-options {
  min-height: 29px;
  border-bottom: 1px solid lightgrey;
  overflow: hidden;
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

/* .wysiwyg-button-active {
  background-color: lightblue;
} */

.wysiwyg-button-loop {
  margin-right: 4px;
}
.hoverTableCont {
    width: 230px;
    margin-right: 30px;
    float: left;
    padding: 15px 0px 0px 15px;
}
.hoverCell {
  border: 1px solid #aaa;
	height: 16px;
	width: 16px;
	margin: 0 1px 1px 0;
	float: left;
	cursor: pointer;
}
.hoverCell:hover {
	background-color: #4b67a1 !important;
}
.hoverRow {
    display: block;
    clear: both;
}
.highlightCell {
  background-color: #d1e0ff;
}
</style>