<template>
  <div v-if="isLoading" class="loading-wrapper">
    <v-layout justify-center align-center fill-height>
      <v-progress-circular
        indeterminate
        color="grey"
      ></v-progress-circular>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      //isLoading: false
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="scss" scoped>
.loading-wrapper {
  height: 100vh;
  width: 100vw;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
</style>

