<template>
  <div class="bond-recomment-tp">
    <div class="bond-recomment-tp-wrapper">
      <h5 class="handicap">
        <span>自动盘口信息查询</span>
        <span v-if="isNew">NEW</span>
      </h5>
      <div
        class="area auto-handicap"
        style="height: 48px; overflow-y: auto; line-height: 19px"
        :class="{
          handicap_content: isNew,
        }"
        v-html="handicap_content"
      ></div>

      <h5>当前交易汇总:</h5>
      <div class="area history">
        <p>{{ history_content }}</p>
      </div>

      <h5>自动操作检测:</h5>
      <div class="area operation">
        <template v-for="operation in operation_content">
          <addOrUpdCard
            v-if="[0, 3].includes(operation.operationType)"
            :operation="operation"
            @onSure="handleCardSure"
            @onDelete="handleCardDelete"
            :opType="operation.operationType === 0 ? 'Add' : 'Upd'"
            :key="operation.offerID"
          >
          </addOrUpdCard>

          <ref-card
            v-if="operation.operationType === 2"
            :key="operation.offerID"
            :operation="operation"
            @onSure="handleCardSure"
            @onDelete="handleCardDelete"
          />

          <tknOrGvnCard
            v-if="operation.operationType === 1 && [0, 1].includes(operation.direction)"
            :opType="operation.direction === 1 ? 'GVN' : 'TKN'"
            :key="operation.offerID"
            :operation="operation"
            @onSure="handleCardSure"
            @onDelete="handleCardDelete"
          >
          </tknOrGvnCard>
        </template>
      </div>

      <div class="btn-group">
        <div class="btn-group-left"></div>
        <div class="btn-group-right">
          <button style="width: 80px" @click="onButtonClick">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import usePolling from '@/app/hooks/usePolling';
import refCard from './components/refCard.vue';
import addOrUpdCard from './components/addOrUpdCard.vue';
import tknOrGvnCard from './components/tknOrGvnCard.vue';
import {computed, watch, ref, reactive} from 'vue';
export default {
  components: {
    refCard,
    addOrUpdCard,
    tknOrGvnCard,
  },
  setup() {
    const focusRoomId = computed(() => window.eb?.store.workspace.focusRoomId);
    const myUserId = computed(() => window.eb?.store.workspace.userId);
    const peerMemberId = computed(() => window.eb?.store.rooms[focusRoomId.value]?.peerMemberId);

    const [cur, old, startPolling] = usePolling({
      key: 'poetry',
      id: '',
    });

    watch(
      focusRoomId,
      (roomId) =>
        roomId &&
        startPolling({
          customer_id: peerMemberId,
          broker_id: myUserId,
          room_id: roomId,
        })
    );

    const isNew = ref(false);
    const handicap_content = ref('');
    const history_content = ref('');
    const operation_content = reactive([]);
    const recommend_reply = ref('');

    const onButtonClick = () => {
      if (recommend_reply) {
        window.eb.proxy.bondRecommend.sendMessage(focusRoomId, {
          body: recommend_reply,
          msgtype: 'm.text',
        });
      }
    };

    return {
      onButtonClick,
      isNew,
      handicap_content,
      history_content,
      operation_content,
      recommend_reply,
    };
  },
};
</script>

<style lang="scss" scoped></style>
