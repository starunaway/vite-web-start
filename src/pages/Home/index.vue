<template>
  <div>
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
      <button @click="polling">polling</button>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {toRefs} from 'vue';
import EventBridge from '@/app/EventBridge';
import usePolling from '@/app/hooks/usePolling';

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
  },

  setup() {
    const store = useStore();

    const startPolling = usePolling({
      key: 'poetry',
    });

    function polling() {
      startPolling('李白', {test: 1});
    }

    return {...toRefs(store.state), polling};
  },
};
</script>

<style></style>
