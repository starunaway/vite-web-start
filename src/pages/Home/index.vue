<template>
  <div>homes</div>
  <button @click="handleGo">go about</button>
  <button @click="vuexClick">vuex-count</button>
  <button @click="vuexClicka">vuex-testa</button>
  <button @click="vuexClickb">vuex-testb</button>
  <button @click="vuexClickc">vuex-testc</button>
  <button @click="login">login</button>

  <span>count is :{{ count.value }}</span>
</template>

<script>
import store from '@/store';
import {useStore} from 'vuex';
import {toRefs, watch, watchEffect} from 'vue';
import EventBridge from '@/app/EventBridge';

export default {
  data() {
    return {
      a: 1,
      b: 1,
    };
  },
  methods: {
    handleGo() {
      this.$router.push('/about');
    },
    vuexClick() {
      EventBridge.commit('count', 1);
    },
    vuexClicka() {
      console.log(this.a);
      this.a++;
      EventBridge.commit('count', this.a);
    },
    vuexClickb() {
      this.b++;

      EventBridge.commit('test.b', this.b);
    },
    vuexClickc() {
      store.commit('updateTestC', {
        c1: this.a,
        c2: this.b,
      });
    },
    login() {
      EventBridge.dispatch('counter.login', {
        userId: 'super',
        password: 'Super20200105@',
      });
    },
  },

  setup() {
    const store = useStore();
    console.log(store.state);
    watchEffect(() => {
      console.log('watchEffect', store.state.login);
    });

    watch(
      () => store.state.test.a,
      (val, old) => {
        console.log(val, old);
      }
    );
    watch(
      () => store.state.test.b,
      (val, old) => {
        console.log(val, old);
      }
    );
    watch(
      () => store.state.test.c,
      (val, old) => {
        console.log(val, old);
      }
    );

    return {...toRefs(store.state)};
  },
};
</script>

<style></style>
