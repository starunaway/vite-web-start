<template>
  <div>homes</div>
  <button @click="handleGo">go about</button>
</template>

<script>
export default {
  methods: {
    handleGo() {
      this.$router.push('/about');
    },
  },
};
</script>

<style></style>
