<template>
    <md-toolbar>
        <h3 class="md-title-primary" style="flex: 1"><a href="/">MyYoutube</a></h3>
        <md-button class="md-primary" ><nuxt-link to="/users">Users</nuxt-link></md-button>
        <md-button class="md-primary">Video</md-button>
        <md-button class="md-primary" v-if="!isAuthenticated"><a href="/login"> Login</a> </md-button>
        <md-button class="md-primary" v-if="isAuthenticated"><a @click="logout"> Logout</a> </md-button>
        <md-button class="md-primary" v-if="!isAuthenticated"><nuxt-link to="/register"> Registration</nuxt-link> </md-button>
        <md-button class="md-primary" v-if="isAuthenticated"><nuxt-link to="/profile"> My Profile</nuxt-link> </md-button>
    </md-toolbar>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    methods: {
      async logout() {
        await this.$auth.logout();
      },
    },
  }
</script>
