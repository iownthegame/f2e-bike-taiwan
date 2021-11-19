<template>
  <div class="content-search-wrapper">
    <div class="content-search">
      <div class="content-search-title">
        請選擇欲搜尋縣市<!--和地區-->
      </div>

      <div class="content-search-input">
        <div>縣市</div>

        <select
          v-model="selectedCity"
          name="city"
        >
          <option value="">
            選擇縣市
          </option>
          <option
            v-for="option in cities"
            :key="option.City"
            :value="option.City"
          >
            {{ option.CityName }}
          </option>
        </select>
      </div>

      <!--div class="content-search-input">
        <div>鄉鎮市區</div>

        <select
            v-model="selectedTown"
            name="town"
          >
            <option value="">
              選擇鄉鎮市區
            </option>
            <option
              v-for="option in towns"
              :key="option.TownCode"
              :value="option.TownCode"
            >
              {{ option.TownName }}
            </option>
          </select>
      </div-->

      <button
        @click="search"
      >
        搜尋
      </button>
    </div>
  </div>

  <div class="content-bg">
    <img src="../assets/backgroundPicture.png">
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Search',
  computed: {
    ...mapState(['cities', 'towns', 'selectedCity', 'selectedTown']),
    selectedCity: {
      get () {
        return this.$store.state.selectedCity
      },
      set (value) {
        this.setSelectedCity(value)
      }
    },
  },
  methods: {
    ...mapActions(['searchRoute', 'getCities', 'getCityTowns']),
    ...mapMutations(['setSelectedCity']),
    search() {
      this.searchRoute()
    }
  },
  created() {
    this.getCities()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  &-bg {
    width: 100%;
    img {
      width: 100%;
    }
  }

  &-search-wrapper {
    position: absolute;
    width: 100%;
    height: calc(100vh - 74px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-search {
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px 16px;
    color: #2B2B2B;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0px 12px;
    max-width: 350px;

    &-title {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 20px;
    }

    &-input {
      width: 100%;
      margin-bottom: 20px;

      div {
        font-size: 16px;
        line-height: 24px;
        margin: 4px 0px;
      }

      select {
        cursor: pointer;
        width: 100%;
        border: 1px solid #949494;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 12px 16px;

        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.015em;

        &:active, &:focus {
          border: none;
          outline: 0;
          border: 1px solid #06B1A7;
          box-shadow: 0px 0px 0px 3px rgba(16, 189, 165, 0.3);
        }
      }
    }

    button {
      background: #007F77;
      border: none;
      border-radius: 5px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #FFFFFF;
      padding: 8px 52px;
      outline: none;
      cursor: pointer;
    }
  }
}

</style>
