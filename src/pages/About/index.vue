<template>
  <div>about</div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"></HelloWorld>
  <router-link to="/">go home</router-link>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'about',
  components: {HelloWorld},
};
</script>

<style></style>
