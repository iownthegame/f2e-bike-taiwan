<template>
  <div :class="searchResultClass">
    <div class="content-search-result">
      <div class="content-search-result-title">
        搜尋結果
        <span>共 {{ searchResultCount }} 筆</span>
      </div>

      <div class="content-search-result-input-group">
        <div class="content-search-result-input">
          <select
            v-model="selectedCity"
            name="city"
          >
            <option
              v-for="option in cities"
              :key="option.City"
              :value="option.City"
            >
              {{ option.CityName }}
            </option>
          </select>
        </div>

        <!--div class="content-search-result-input">
          <select
              name="region"
            >
              <option value="">
                鄉鎮市區
              </option>
            </select>
        </div-->
      </div>

      <div class="card-list">
        <Card
          v-for="(result, idx) in searchResults"
          :info="result"
          :key="idx"
          @click="() => onRouteClick(result)"
        />
      </div>
    </div>
  </div>

  <div
    v-if="routeInfo"
    class="content-route-info-wrapper"
  >
    <div class="content-route-info-map">
      <div
        class="content-route-info-back content-route-info-round-button"
        @click="onBackClick"
      >
        <img src="../assets/ArrowLeft.png">
      </div>

      <div v-if="youBikeVisible">
        <!-- <BikeButton type="default" /> -->
        <BikeButton
          v-for="bikeStation in bikeStations"
          :key="bikeStation.StationID"
          :type="bikeInfo && bikeInfo.StationID === bikeStation.StationID ? 'selected' : 'default'"
          @click="() => onBikeStationClick(bikeStation)"
        />

        <!-- <BikeButton type="no_service" /> -->
        <!-- <GpsButton /> -->
        <!-- <StopButton type="from" /> -->
        <!-- <StopButton type="to" /> -->
      </div>

      <div class="content-route-info-card">
        <div>
          <Card
            v-if="bikeInfo"
            :info="bikeInfo"
            place="bottom"
            type="bike"
          />
          <Card
            v-else
            :info="routeInfo"
            place="bottom"
            type="route"
          />

          <div
            :class="youBikeStopsClass"
            @click="toggleEye"
          >
            <img
              v-if="!youBikeVisible"
              src="../assets/Eye.png"
            >
            <img
              v-else
              src="../assets/EyeClosed.png"
            >
            <span>YouBike 站</span>
          </div>

          <div
            class="content-route-info-gps content-route-info-round-button"
            @click="locateMe"
          >
            <img
              v-if="!location"
              src="../assets/Vector.png"
            >
            <img
              v-else
              src="../assets/VectorEnabled.png"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import Card from './Card.vue'
import BikeButton from './BikeButton.vue'
// import GpsButton from './GpsButton.vue'
// import StopButton from './StopButton.vue'

export default {
  name: 'SearchResult',
  components: {
    Card,
    BikeButton,
    // GpsButton,
    // StopButton
  },
  data() {
    return {
      youBikeVisible: false,
      gettingLocation: false,
      location: null,
      busyScrolling: false,
    }
  },
  computed: {
    ...mapState(['searchResults', 'routeInfo', 'bikeInfo', 'selectedCity', 'cities', 'bikeStations']),
    selectedCity: {
      get () {
        return this.$store.state.selectedCity
      },
      set (value) {
        this.setSelectedCity(value)
        this.searchRoute()
      }
    },
    searchResultCount() {
      return this.searchResults.length
    },
    youBikeStopsClass() {
      return {
        'content-route-info-stops': true,
        'content-route-info-stops-on': this.youBikeVisible
      }
    },
    searchResultClass() {
      return {
        'content-search-result-wrapper': true,
        'content-search-result-wrapper-bg': !!this.routeInfo,
      }
    }
  },
  mounted() {
    this.getNextPageResult()
  },
  methods: {
    ...mapActions(['searchRoute', 'getBikeStationNearBy', 'searchMoreRoute']),
    ...mapMutations(['setRouteInfo', 'setBikeInfo', 'setSelectedCity']),
    toggleEye() {
      this.youBikeVisible = !this.youBikeVisible;
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
        console.log(this.location)
      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    },
    onBackClick() {
      if (this.bikeInfo) {
        this.setBikeInfo(null)
      } else {
        this.setRouteInfo(null)
        this.youBikeVisible = false
      }
    },
    onRouteClick(result) {
      this.setRouteInfo(result)
      this.getBikeStationNearBy()
    },
    onBikeStationClick(bikeStation) {
      this.setBikeInfo({ ...bikeStation, City: this.routeInfo.City })
    },
    getNextPageResult() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 1 >= document.documentElement.offsetHeight;

        if (bottomOfWindow && !this.busyScrolling) {
          this.busyScrolling = true

          setTimeout(() => {
            this.searchMoreRoute()
            this.busyScrolling = false
          }, 200)
        }
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  &-search-result-wrapper {
    background: #F5F7F9;
    min-height: calc(100vh - 80px);

    &-bg {
      height: calc(100vh - 80px);
      overflow: hidden;
    }
  }

  &-search-result {
    padding: 16px 12px;

    &-title {
      display: flex;
      align-items: center;

      font-weight: 500;
      font-size: 16px;
      line-height: 24px;

      span {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #949494;
        margin-left: 12px;
      }

      margin-bottom: 12px;
    }

    &-input-group {
      display: flex;
    }

    &-input {
      margin-right: 8px;

      select {
        cursor: pointer;
        border: 1px solid #007F77;
        box-sizing: border-box;
        border-radius: 4px;
        outline: none;
        padding: 6px 12px;

        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.01em;

        &:active, &:focus {
          border: none;
          outline: 0;
          border: 1px solid #06B1A7;
          box-shadow: 0px 0px 0px 3px rgba(16, 189, 165, 0.3);
        }
      }
    }
  }

  &-route-info-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &-route-info {
    &-map {
      // background: skyblue;
      background-image: url('../assets/map.png');
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      width: 100%;
      height: 100%;
    }

    &-card {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    &-back {
      position: absolute;
      top: 20px;
      left: 16px;
    }

    &-round-button {
      background: #FFFFFF;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      border-radius: 100px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &-gps {
      position: absolute;
      right: 16px;
      top: -68px;
    }

    &-stops {
      position: absolute;
      left: 16px;
      top: -68px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 12px;
      padding-left: 13.5px;
      cursor: pointer;

      background: #007F77;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      border-radius: 100px;

      img {
        width: 21px;
      }

      span {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.01em;
        color: #FFFFFF;
        margin-left: 8px;
      }

      &-on {
        background: #FFFFFF;
        span {
          color: #2B2B2B;
        }
      }
    }
  }
}
</style>
