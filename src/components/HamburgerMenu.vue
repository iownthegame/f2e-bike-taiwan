<template>
  <template v-if="menuVisible">
    <div class="menu-shadow"></div>
    <div class="menu">
      <div class="menu-close">
        <img src="../assets/X.svg" @click="closeMenu">
      </div>
      <div class="menu-content">
        <div
          v-for="item in menuItems"
          class="menu-item"
          :class="activeMenuItem === item.page ? 'menu-item-active' : ''"
          :key="item.page"
          @click="() => selectMenu(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="menu-footer">
        <div class="menu-social-icon">
          <a href="https://www.facebook.com/groups/173311386703334/" target="_blank"><img src="../assets/FacebookLogo.svg"></a>
        </div>
        <div class="menu-social-icon">
          <a href="https://www.instagram.com/hexschool/" target="_blank"><img src="../assets/InstagramLogo.svg"></a>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'HamburgerMenu',
  computed: {
    ...mapState(['menuVisible', 'activeMenuItem'])
  },
  data() {
    return {
      menuItems: [
        {
          name: '找路線',
          page: 'routes'
        },
        {
          name: '最新消息',
          page: 'news'
        },
        {
          name: '聯絡我們',
          page: 'contact'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setMenuVisible', 'setMenuItem', 'setSearchResults']),
    closeMenu() {
      this.setMenuVisible(false)
    },
    selectMenu(item) {
      this.setMenuItem(item.page)
      // this.setSearchResults([])
      this.closeMenu()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.menu-shadow {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
}

.menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 66.67%;
  background: #F5F7F9;
  height: 100vh;

  &-close {
    width: 100%;
    text-align: right;
    margin-bottom: 40px;
    margin-top: 23px;
    img {
      cursor: pointer;
      margin-right: 19px;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-item {
    cursor: pointer;
    margin-bottom: 32px;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;

    &-active {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #007F77;
    }
  }

  &-footer {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 32.5px;
  }

  &-social-icon {
    cursor: pointer;
    + .menu-social-icon {
      margin-left: 24.5px;
    }
  }
}
</style>
