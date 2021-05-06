import {reactive, computed, onMounted, onUnmounted, ref, toRefs, watch} from 'vue';

export default {
  setup() {
    const {counter, doubleCounter, resetCounter, startCount, stopCount} = useCounter();

    const desc = ref(null);
    watch(counter, (val, oldVal) => {
      desc.value.textContent = `counter value change from ${oldVal} to ${val} `;
    });

    return () => (
      <div>
        <div>counter is :{counter.value}</div>
        <div>doubleCounter is: {doubleCounter.value}</div>
        <p ref={desc}>...</p>
        <button onClick={resetCounter}>reset</button>
        <button onClick={stopCount}>stop</button>
        <button onClick={startCount}>start</button>
      </div>
    );
  },
};

function useCounter() {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2),
  });

  let timer = null;

  const resetCounter = () => (data.counter = 0);

  const stopCount = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };
  const startCount = () => {
    if (!timer) {
      timer = setInterval(() => {
        data.counter++;
      }, 1000);
    }
  };

  onMounted(startCount);

  onUnmounted(() => {
    clearInterval(timer);
  });

  return {
    ...toRefs(data),
    resetCounter,
    startCount,
    stopCount,
  };
}
