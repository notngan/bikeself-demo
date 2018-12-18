<template>
  <v-layout class="wrapper" justify-center align-center>
    <v-flex xs10 sm8 md4>
      <v-card>
        <v-container>
          <v-card-title>
            <v-layout>
              <h1>Admin Log-in</h1>
            </v-layout>
          </v-card-title>

          <form @submit.prevent="onLogIn">
            <v-text-field
              outline
              label="Email"
              v-model="email"
              type="email"
              required
              ></v-text-field>

            <v-text-field
              outline
              label="Password"
              v-model="password"
              type="password"
              required
              ></v-text-field>

            <v-layout justify-end>
              <v-btn large color="accent" type="submit">Log in</v-btn>  
            </v-layout>
          </form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      email: null,
      password: null,
      user: null
    }
  }, 
  computed: {
    ...mapGetters(['isAdmin', 'signedInUser', 'userByEmail', 'isSignedIn']),
  },
  watch: {
    isAdmin (val) {
      if (val == true) {
        if (this.$router.currentRoute.query.redirect) {
          this.$router.push(this.$router.currentRoute.query.redirect)
        } else {
          this.$router.push('/admin')
        }
      } else {
        this.$router.push('/admin/login')
      }
    },
    // isSignedIn (val) {
    //   if (val) {
    //    if (this.$router.currentRoute.query.redirect) {
    //       this.$router.push(this.$router.currentRoute.query.redirect)
    //     } else {
    //       this.$router.push('/admin')
    //     }
    //   } else {
    //     this.$router.push('/admin/login')
    //   }
    // }
  },

  mounted () {
  },

  methods: {
    ...mapActions(['clearMessage', 'addMessage','logAdminIn', 'signUserOut']),
    onLogIn () {
      this.logAdminIn({
        email: this.email, 
        password: this.password,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
</style>

