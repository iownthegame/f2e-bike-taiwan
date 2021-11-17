<template>
  <div class="header">
    <div class="header-logo">
      <img src="../assets/logo.svg">
    </div>

    <div class="header-title">
      <div>台灣<span>自行車</span>旅遊網</div>
      Taiwan Bike
    </div>

    <div class="header-menu">
      <img src="../assets/List.svg" @click="openMenu">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Header',
  methods: {
    ...mapMutations(['setMenuVisible']),
    openMenu() {
      this.setMenuVisible(true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 16px 12px;
  box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.1);

  &-logo {
  }

  &-title {
    margin-left: 12px;
    display: flex;
    flex-direction: column;

    div {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.01em;
      span {
        color: #007F77
      }
    }
  }

  &-menu {
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
