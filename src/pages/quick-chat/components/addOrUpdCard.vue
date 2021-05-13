<template>
  <div
    :class="{
      'op-card': true,
      add: opType === 'Add',
      upd: opType === 'Upd',
    }"
  >
    <div class="op-card-header">
      <div class="op-card-header-left">
        <span :class="opCardLabelClass">{{ opType }}</span>
        <span>{{ msg }}</span>
      </div>
      <div class="op-card-header-right">
        <button @click="handleDelete">删除</button>
      </div>
    </div>

    <div class="op-card-content">
      <div class="op-card-content-first">
        <div class="op-card-item bond-code">
          <span>
            {{ bondCode }}
          </span>
        </div>
        <div class="op-card-item bond-name">
          <span>
            {{ bondName }}
          </span>
        </div>

        <!-- <div class="op-card-item direction">
          <s-check-button
            :width="40"
            :checked="direction === 0"
            class="bid"
            @change="(value) => handleChange('bid', value)"
            >Bid</s-check-button
          >
          <s-check-button
            :width="40"
            :checked="direction === 1"
            class="ofr"
            @change="(value) => handleChange('ofr', value)"
            >Ofr</s-check-button
          >
        </div>

        <div class="op-card-item star">
          <s-check-button
            :width="24"
            class="trust"
            :checked="trustDegree === '1'"
            @change="(value) => handleChange('trust_1', value)"
            >*</s-check-button
          >
          <s-check-button
            :width="24"
            :checked="trustDegree === '2'"
            class="trust"
            @change="(value) => handleChange('trust_2', value)"
            >**</s-check-button
          >
        </div>

        <div class="op-card-item dark">
          <s-checkbox :checked="isDark" @checked="(value) => handleChange('dark', value)"
            >暗盘</s-checkbox
          >
        </div>
      </div>

      <div class="op-card-content-second">
        <div class="op-card-item price">
          <input v-model.number="price" type="number" @click="focusAndSelect" />
        </div>

        <div class="op-card-item price-type">
          <Select v-model="priceType" class="recommend-select" @on-change="handlePriceTypeChange">
            <Option v-for="item in PRICE_TYPES" :value="item.key" :key="item.key">{{
              item.value
            }}</Option>
          </Select>
        </div>

        <div class="op-card-item amount">
          <input v-model.number="amount" type="number" @click="focusAndSelect" />
          <span>KW</span>
        </div>
        <div class="op-card-item delivery" @click="showSettleModal">
          <span>{{ delivery }}</span>
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, ref, toRefs} from 'vue';
import {getMsgFromOperation} from './utils';

export default {
  props: {
    operation: Object,
    opType: String,
  },
  setup(props, context) {
    const {opType, operation} = toRefs(props);
    const bondCode = computed(() => operation!.value!.bondCode);
    const bondName = ref('');

    const msg = computed(() => getMsgFromOperation(operation!.value));
    const opCardLabelClass = computed(() => 'op-card-label ' + (opType!.value as string).toLowerCase());

    const handleDelete = () => {
      context.emit('onDelete', {});
    };

    return {
      opType,
      msg,

      bondCode,
      bondName,
      opCardLabelClass,
      handleDelete,
    };
  },
};
</script>

<style lang="scss">
@import './style.scss';
.op-card.add {
  .op-card-header {
    &-left {
      color: #039e86;
    }
  }
  .op-card-label.add {
    background: #039e86;
  }
}

.op-card.upd {
  .op-card-header {
    &-left {
      color: #6633cd;
    }
  }
  .op-card-label.upd {
    background: #6633cd;
  }
}

.op-card {
  .op-card-content {
    // display: flex;
    // flex-direction: column;
    .op-card-content-first {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      .op-card-item.bond-code {
        margin-right: 8px;
      }
      .op-card-item.bond-name {
        width: 80px;
        margin-right: 12px;
      }
      .op-card-item.direction {
        margin-right: 16px;

        .bid {
          margin-right: 6px !important;
        }

        .bid.s-checkbutton.checked {
          border: 1px solid #6d3500;
          background: #ff7d00;
          color: #000;
        }
        .ofr.s-checkbutton.checked {
          background: #009aff;
          border: 1px solid #002c6d;
          color: #000;
        }
      }
      .op-card-item.star {
        display: flex;
        margin-right: 16px;

        .trust:first-child {
          font-size: 24px;
          line-height: 24px;
          margin-right: 8px;
        }
        .trust.s-checkbutton.checked {
          background: #039e86;
          border: 1px solid #039e86;
          color: #fafafa;
        }
      }
    }
    .op-card-content-second {
      display: flex;
      align-items: center;
      .op-card-item.price-type {
        margin-right: 8px;
      }
    }
  }
  .ss-checkbox-wrapper {
    .ss-checkbox.ss-checkbox-checked {
      .ss-checkbox-inner {
        width: 9px;
        height: 5px;
      }
    }
  }
}
</style>
