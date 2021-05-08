<template>
  <div>homes</div>
  <button @click="handleGo">go about</button>
  <div>
    <button @click="handleCountClick">count++</button>
    <span>count is :{{ count }}</span>
  </div>
  <div>
    <button @click="handleTestA">handleTestA</button>
    <span>test.a is :{{ test.a.hello }}</span>
  </div>
  <div>
    <button @click="handleTestB">handleTestB</button>
    <span>test.b is :{{ test.b }}</span>
  </div>
  <div>
    <button @click="handleTestC">handleTestC</button>
    <span>test.c a+b is :{{ test.c }}</span>
  </div>

  <div>
    <button @click="handleTestD">handleTest s.u.v.w.x</button>
    <span> s.u.v.w.x is :{{ s.u.v.w.x.y.z.go }}</span>
  </div>

  <div>
    <button @click="Clogin">counter.login</button>
    <button @click="loginA">loginA</button>
    <button @click="loginAAA">loginAAA</button>
  </div>
</template>

<script>
import store from '@/store';
import {useStore} from 'vuex';
import {toRefs, watch, watchEffect} from 'vue';
import EventBridge from '@/app/EventBridge';

export default {
  data() {
    return {
      dataA: 0,
      dataB: 0,
    };
  },
  methods: {
    handleGo() {
      this.$router.push('/about');
    },
    handleCountClick() {
      EventBridge.commit('count', this.count + 1);
    },

    handleTestA() {
      this.dataA++;
      EventBridge.commit('test.a', this.dataA);
    },
    handleTestB() {
      this.dataB++;
      EventBridge.commit('test.b', this.dataB);
    },
    handleTestC() {
      EventBridge.commit('test.c', {
        a: this.dataA,
        b: this.dataB,
      });
    },

    handleTestD() {
      EventBridge.commit('s.u.v.w.x.y.z', this.dataA);
    },

    Clogin() {
      EventBridge.dispatch('counter.login', {
        userId: 'super',
        password: 'Super20200105@',
      });
    },

    loginA() {
      EventBridge.dispatch('loginA', {
        userId: 'super',
        password: 'Super20200105@',
      });
    },
    loginAAA() {
      EventBridge.dispatch('counter.loginA.loginA.loginA', {
        userId: 'super',
        password: 'Super20200105@',
      });
    },
  },

  setup() {
    const store = useStore();
    console.log(store.state);

    return {...toRefs(store.state)};
  },
};
</script>

<style></style>
