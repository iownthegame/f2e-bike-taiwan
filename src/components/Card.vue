<template>
  <div :class="cardClass">
    <template v-if="type === 'route'">
      <div class="card-item-heading">
        <div class="card-item-title">{{ info.RouteName }}</div>
        <div class="card-item-label">{{ info.Direction || '單向' }}</div>
      </div>

      <hr class="card-item-divider" />

      <div class="card-item-content">
        <div class="card-item-directions">
          <div>
            <div class="card-item-directions-icon">
              <StopButton type="from" />
            </div>
            <span class="card-item-directions-place">{{ info.RoadSectionStart }}</span>
          </div>

          <div>
            <div class="card-item-directions-icon">
              <StopButton type="to" />
            </div>
            <div class="card-item-directions-place">{{ info.RoadSectionEnd }}</div>
          </div>
        </div>

        <div class="card-item-distance">
          <div class="card-item-distance-label">全長</div>
          <div class="card-item-distance-unit">{{ info.CyclingLength / 1000 }} 公里</div>
        </div>
      </div>
    </template>

    <template v-if="type === 'bike'">
      <div class="card-item-dragger"></div>
      <div class="card-item-heading card-item-heading-bike">
        <div class="card-item-title">{{ info.StationName.Zh_tw }}</div>
        <div class="card-item-subtitle">
          <img src="../assets/MapPin.png">
          <span>{{ info.City }}</span>
          <span>{{ info.StationAddress.Zh_tw }}</span>
        </div>
      </div>

      <hr class="card-item-divider" />

      <div class="card-item-labels">
        <div :class="`card-item-label card-item-label-${stationStatuses[info.availability.ServiceStatus].tag}`">
          <div class="card-item-label-dot"></div>
          {{ stationStatuses[info.availability.ServiceStatus].text }}
        </div>
        <div class="card-item-label">{{ bikeTypes[info.ServiceType] }}</div>
      </div>

      <div class="card-item-panel">
        <div class="card-item-panel-item">
          <div class="card-item-panel-label">可租</div>
          <div class="card-item-panel-value">{{ info.availability.AvailableRentBikes || 'TBA' }}</div>
        </div>
        <div class="card-item-panel-item">
          <div class="card-item-panel-label">可還</div>
          <div class="card-item-panel-value">{{ info.availability.AvailableReturnBikes || 'TBA' }}</div>
        </div>
      </div>

      <div class="card-item-time">Last update: {{ info.availability.UpdateTime }}</div>

      <hr class="card-item-divider" />

      <div class="card-item-nearby">
        <div class="card-item-nearby-title">
          查看附近的
        </div>

        <div class="card-item-nearby-items">
          <div class="card-item-nearby-item">
            <img src="../assets/ForkKnife.png">
            <span>觀光餐飲</span>
          </div>
          <div class="card-item-nearby-item">
            <img src="../assets/Camera.png">
            <span>景點資訊</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import StopButton from './StopButton.vue'

export default {
  name: 'Card',
  components: {
    StopButton
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    place: {
      type: String,
      required: false,
      default: 'normal'
    },
    type: {
      type: String,
      required: false,
      default: 'route'
    }
  },
  data() {
    return {
      stationStatuses: {
        undefined: {
          text: 'undefined',
          tag: 'undefined'
        },
        0: {
          text: '停止營運',
          tag: 'alert'
        },
        1: {
          text: '正常營運',
          tag: 'default'
        },
        2: {
          text: '暫停營運',
          tag: 'warn'
        }
      },
      bikeTypes: {
        1: 'Youbike 1.0',
        2: 'Youbike 2.0'
      }
    }
  },
  computed: {
    cardClass() {
      return {
        'card-item': true,
        'card-item-bottom': this.place === 'bottom'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
  &-item {
    cursor: pointer;
    margin-top: 16px;

    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;

    &-bottom {
      box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.09);
      border-radius: 8px 8px 0px 0px;
      cursor: default;
    }

    &-heading, &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-heading-bike {
      flex-direction: column;
      align-items: flex-start;
    }

    &-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.01em;
    }

    &-subtitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 4px;

      span {
        font-weight: normal;
        font-size: 10px;
        line-height: 16px;
        letter-spacing: 0.01em;
        margin-left: 4px;

        + span {
          flex: 1;
        }
      }
    }

    &-labels {
      display: flex;
      margin-bottom: 12px;
    }

    &-label {
      background: #F3F3F3;
      border-radius: 50px;

      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.01em;
      color: #949494;
      padding: 6px 12px;

      display: flex;
      align-items: center;

      + .card-item-label {
        margin-left: 8px;
      }

      &-dot {
        width: 4px;
        height: 4px;
        background: #06B1A7;
        border-radius: 50%;
        margin-right: 4px
      }

      &-default {
      }

      &-alert {
        background: #FEE8E8;

        .card-item-label-dot {
          background: #D12419;
        }
      }

      &-warn {
        background: #F7ECD2;

        .card-item-label-dot {
          background: #E2A70D;
        }
      }
    }

    &-directions {
      &-icon {
        display: flex;
      }

      &-place {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.01em;
        margin-left: 8px;
        display: flex;
        align-items: center;
      }

      > div {
        display: flex;
        align-items: center;

        + div {
          margin-top: 8px;
        }
      }
    }

    &-distance {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-label {
        font-weight: normal;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        letter-spacing: 0.01em;
        color: #949494;
        margin-bottom: 4px;
      }

      &-unit {
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.01em;
        color: #007F77;
      }
    }

    &-panel {
      display: flex;
      align-items: center;
      background: rgba(0, 127, 119, 0.1);
      border-radius: 4px;
      padding: 12px 0;
      justify-content: space-between;

      &-item {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;

        + .card-item-panel-item {
          border-left: 1px solid #E7E7E7;
        }
      }

      &-label {
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.01em;
        color: #949494;
        margin-bottom: 4px;
      }

      &-value {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        letter-spacing: 0.01em;
        color: #000000;
      }
    }

    &-nearby {
      &-title {
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.01em;
        margin-bottom: 16px;
      }

      &-items {
        display: flex;
        justify-content: space-between;
      }

      &-item {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;

        border: 1px solid #007F77;
        box-sizing: border-box;
        border-radius: 4px;
        width: 48%;
        padding: 16px;

        img {
          margin-bottom: 8px;
        }

        span {
          font-weight: normal;
          font-size: 12px;
          line-height: 20px;
          text-align: center;
          letter-spacing: 0.01em;
          color: #007F77;
        }
      }
    }

    &-time {
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.01em;
      color: #B9B9B9;
      margin-top: 12px;
    }

    &-divider {
      border: 1px solid #F3F3F3;
      margin: 12px 0;
    }

    &-dragger {
      cursor: ns-resize;
      background: #E7E7E7;
      border-radius: 5px;
      width: 32px;
      height: 3px;
      margin: 0 auto;
      margin-bottom: 12px;
    }
  }
}

</style>
