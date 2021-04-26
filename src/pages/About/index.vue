<template>
  <div>about</div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"></HelloWorld>
  <router-link to="/">go home</router-link>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import EventBridge from '@/app/EventBridge';
export default {
  name: 'about',
  components: {HelloWorld},
  created() {
    EventBridge.on('test', (v, u) => {
      console.log(v, u);
    });
  },
};
</script>

<style></style>
