<template>
  <div
    :class="`button-bike button-bike-${type}`"
  >
    <img
      src="../assets/Bicycle.png"
    >
  </div>
</template>

<script>
export default {
  name: 'BikeButton',
  props: {
    type: {
      required: true,
      type: String
    }
  }
}
</script>


<style lang="scss" scoped>
  .button-bike {
    cursor: pointer;
    border-radius: 100px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    &-selected {
      background: #035A55;
    }

    &-default {
      background: #06B1A7;
    }

    &-no_service {
      background: #B9B9B9;
    }
  }
</style>
