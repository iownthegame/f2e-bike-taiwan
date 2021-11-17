<template>
  <div
    class="button-gps"
  >
    <img
      src="../assets/VectorWhite.png"
    >
  </div>
</template>

<script>
export default {
  name: 'GpsButton'
}
</script>


<style lang="scss" scoped>
  .button-gps {
    background: rgba(6, 177, 167, 0.6);
    border: 1px solid #035A55;
    box-sizing: border-box;
    backdrop-filter: blur(7px);
    border-radius: 100px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
