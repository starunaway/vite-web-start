<template>
  <div class="bond-recommend-tp">
    <div class="bond-recommend-tp-wrapper">
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
        <template v-for="operation in operation_content.value">
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
import {computed, watch, ref, reactive, ComputedRef, toRefs} from 'vue';
import {useStore} from 'vuex';
export default {
  components: {
    refCard,
    addOrUpdCard,
    tknOrGvnCard,
  },
  setup() {
    const store = useStore();

    let focusRoomId: ComputedRef<string | undefined> = computed(() => store.state.qm.workspace.focusRoomId);

    const startPolling = usePolling({
      key: 'quickChat',
    });

    watch(focusRoomId, (roomId) => {
      if (roomId) {
        startPolling(roomId, {
          room_id: roomId,
        });
      }
    });

    let isNew = ref(false);
    let handicap_content = ref('');
    let history_content = ref('');
    let operation_content = reactive({value: []});
    let recommend_reply = ref('');
    const quickChat = computed(() => store.state.quickChat);

    watch(quickChat, (curData) => {
      isNew.value = !!curData.result.handicap && curData.result.handicap !== handicap_content.value;
      handicap_content.value = curData.result.handicap;
      history_content.value = curData.result.history;
      operation_content.value = curData.result.operations;
      recommend_reply.value = curData.result.recommend_reply;
    });

    watch(isNew, (cur) => {
      if (cur) {
        setTimeout(() => {
          isNew.value = false;
        }, 1000);
      }
    });

    const onButtonClick = () => {
      if (recommend_reply) {
        window.eb?.proxy.bondRecommend.sendMessage(focusRoomId, {
          body: recommend_reply,
          msgtype: 'm.text',
        });
      }
    };

    const handleCardSure = (params: any) => {
      console.log('handleCardSure', params);
    };

    const handleCardDelete = () => {};

    return {
      onButtonClick,
      handleCardSure,
      handleCardDelete,
      isNew,
      handicap_content,
      history_content,
      operation_content,
      recommend_reply,
    };
  },
};
</script>

<style lang="scss">
.bond-recommend-tp {
  min-width: 475px;
  overflow: auto;
  background-color: #ffffff;
  font-size: 14px;
  height: 100%;
  width: 100%;
  min-height: 344px;
  &-wrapper {
    padding: 8px;
    height: 100%;
    // border: 1px solid #dedede;
    display: flex;
    border-radius: 2px;
    flex-direction: column;

    h5 {
      font-size: 12px;
      font-weight: bold;
      color: #000;
      line-height: 12px;
      margin-bottom: 4px;
      margin-top: 0;
    }
    h5.handicap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .area {
      padding: 4px;
      border: 1px solid #dedede;
      color: #039e86;
      border-radius: 2px;
      margin-bottom: 8px;
    }
    .area.auto-handicap {
      min-height: 48px;
    }
    .area.handicap_content {
      background: linear-gradient(to right, #078f7a, #193d37);
      color: #fff;
    }
    .area.history {
      overflow-y: auto;
      overflow-x: hidden;
      height: 90px;
      white-space: pre-line;
    }
    .area.operation {
      flex: 1;
      padding: 0px;
      border: none;
      overflow-y: auto;
    }
    .area.recommend_reply {
      margin-bottom: 8px;
      font-size: 12px;
      &.ant-input {
        box-shadow: none;
        color: #a0a0a0;
        outline: none;
        resize: none;
        &:focus {
          color: #a0a0a0;
        }
      }
    }
    .btn-group {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-left {
        button {
          margin-right: 8px;
        }
      }

      button.disabled {
        background-color: #c8c8c8;

        &:hover {
          background-color: #c8c8c8;
        }
      }

      button {
        &:hover {
          background-color: #6ec2b5;
        }
        border: none;
        background-color: #039e86;
        outline: none;
        width: 60px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #fafafa;
        font-size: 14px;
        border-radius: 2px;
      }
    }
  }
}
</style>
