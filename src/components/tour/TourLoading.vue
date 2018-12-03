<template>
  <div v-if="isTourLoading">
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
    ...mapGetters(['isTourLoading'])
  }
}
</script>