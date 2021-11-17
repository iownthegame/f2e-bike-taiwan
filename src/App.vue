<template>
  <div class="app">
    <Header />
    <Content />
    <HamburgerMenu />
  </div>
</template>

<script>
import Content from './components/Content.vue'
import HamburgerMenu from './components/HamburgerMenu.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Content,
    HamburgerMenu,
    Header
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

#app {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.app {
  width: 100%;
}

html, body, #app, input, button, select {
  margin: 0;
  font-family: 'Noto Sans TC', sans-serif;
  color: #2B2B2B;
}
</style>
