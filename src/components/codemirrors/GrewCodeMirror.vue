<template>
  <CodemirrorVueWrapper :options="cmOptionMerged" :spellcheck="false"></CodemirrorVueWrapper>
</template>

<script lang="ts">
import CodeMirror from 'codemirror';
import CodemirrorVueWrapper from 'codemirror-editor-vue3';

import 'codemirror/lib/codemirror.css';

import {defineComponent, PropType} from 'vue';

CodeMirror.defineMode('grew', () => {
  const words = {
    global: 'builtin',
    pattern: 'builtin',
    commands: 'builtin',
    without: 'builtin',
  };
  function tokenBase(stream: any, state: any) {
    const ch = stream.next();
    if (ch === '%') {
      stream.skipToEnd();
      return 'comment';
    }
    if (ch === '=') {
      return 'quote';
    }
    if (ch === '<') {
      if (stream.eat('>')) {
        return 'quote';
      }
    }
    if (ch === '-') {
      const nextCh = stream.next();
      if (nextCh === '[' || nextCh === '>') {
        return 'quote';
      }
    }
    if (ch === ']') {
      if (stream.eat('-') && stream.eat('>')) {
        return 'quote';
      }
    }
    if (/\d/.test(ch)) {
      stream.eatWhile(/[\d]/);
      if (stream.eat('.')) {
        stream.eatWhile(/[\d]/);
      }
      return 'number';
    }
    if (/[+\-*&%=<>!?|]/.test(ch)) {
      return 'operator';
    }
    stream.eatWhile(/\w/);
    const cur = stream.current() as 'global' | 'pattern' | 'commands' | 'without';
    return words[cur] || 'variable';
  }

  return {
    startState() {
      return { tokenize: tokenBase, commentLevel: 0 };
    },
    token(stream: any, state: any) {
      if (stream.eatSpace()) return null;
      return state.tokenize(stream, state);
    },
    lineComment: '%',
  };
});

export default defineComponent({
  name: 'GrewCodeMirror',
  components: { CodemirrorVueWrapper },
  props: {
    // query: {
    //   type: String,
    //   required: true,
    // },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      cmOption: {
        tabSize: 4,
        lineNumbers: true,
        lineWrapping: true,
        line: true,
        mode: 'grew',
        theme: this.$q.dark.isActive ? 'material-darker' : 'default',
      },
    };
  },
  computed: {
    cmOptionMerged() {
      return {...this.cmOption, readOnly: this.disabled ? 'nocursor' : false};
    }
  }
});
</script>
