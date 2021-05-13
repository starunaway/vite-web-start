<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count++">count is: {{ count }}</button>
  <button @click="emit">EventBridge emit</button>
  <h5>jsxComponent</h5>
  <jsxComponent></jsxComponent>
  <h5>reactiveComponent</h5>
  <reactiveComponent></reactiveComponent>
  <h5>modal</h5>
  <modal></modal>
  <h5>renderTest with h</h5>
  <renderTest></renderTest>
</template>

<script lang="ts">
import {ref, defineComponent, h} from 'vue';
import EventBridge from '@/app/EventBridge';
import jsxComponent from './jsxComponent';
import reactiveComponent from './reactive';
import modal from './modal.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    jsxComponent,
    reactiveComponent,
    modal,
    renderTest: {
      render() {
        return h('div', [
          '这个组件使用render api生成的',
          h(
            'button',

            {
              onClick() {
                EventBridge.emit('test', 'renderTest', 233);
              },
            },
            'open console'
          ),
        ]);
      },
    },
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  methods: {
    emit() {
      EventBridge.emit('test', 'hhh', 233);
    },
  },
  setup: () => {
    const count = ref(0);
    return {count};
  },
});
</script>

<style scoped lang="scss">
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
