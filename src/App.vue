<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <JsxComponent msg="jsx"></JsxComponent> -->
  <router-view></router-view>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import JsxComponent from '@/components/jsxComponent';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    JsxComponent,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
}
</style>
