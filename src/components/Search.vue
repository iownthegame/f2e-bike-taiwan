<template>
  <div class="content-search-wrapper">
    <div class="content-search">
      <div class="content-search-title">
        請選擇欲搜尋縣市和地區
      </div>

      <div class="content-search-input">
        <div>縣市</div>

        <select
            name="city"
          >
            <option value="">
              選擇縣市
            </option>
          </select>
      </div>

      <div class="content-search-input">
        <div>鄉鎮市區</div>

        <select
            name="region"
          >
            <option value="">
              選擇鄉鎮市區
            </option>
          </select>
      </div>

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
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  methods: {
    ...mapActions(['searchRoute']),
    search() {
      this.searchRoute()
    }
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
        width: 100%;
        border: 1px solid #949494;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 12px 16px;

        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.015em;
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
