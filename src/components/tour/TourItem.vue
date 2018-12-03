<template>
  <v-card flat tile hover>
    <v-img
      :src="tour.image"
      :height="'200px'"
    >
    </v-img>
    <v-card-title primary-title>
      <v-layout align-space-between column fill-height>
        <v-flex>
          <h2 class="headline font-weight-bold text-capitalize mt-0">
            <router-link :to="'tours/' + tour.id">{{ tour.title }}</router-link>
          </h2>
        </v-flex>
        <v-flex>
          <div>{{ tour.description.substring(0,100) }}...</div>
          <div class="mt-2 text-xs-right grey--text caption">{{tour.author}},&nbsp; {{tour.date}}</div>
        </v-flex>
      </v-layout>
    </v-card-title>


    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  props: ['tour']
}
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>

