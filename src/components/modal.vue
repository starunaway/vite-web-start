<template>
  <div>
    <button @click="modelOpen = true">open modal</button>
    <teleport to="body">
      <div v-show="modelOpen" class="modal">
        <div>
          this is a modal
          <button @click="modelOpen = false">close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  setup() {
    const modelOpen = ref(false);
    return {
      modelOpen,
    };
  },
};
</script>

<style lang="scss">
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    width: 400px;
    height: 400px;
    padding: 8px;
  }
}
</style>
