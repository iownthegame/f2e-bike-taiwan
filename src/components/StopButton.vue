<template>
    <img
      src="../assets/badge_from.png"
      v-if="type === 'from'"
    >

    <img
      src="../assets/badge_to.png"
      v-if="type === 'to'"
    >
</template>

<script>
export default {
  name: 'StopButton',
  props: {
    type: {
      required: true,
      type: String
    }
  }
}
</script>
