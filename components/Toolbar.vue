<template>
    <md-toolbar>
      <h3 class="md-title-primary" style="flex: 1"><a href="/">MyYoutube</a></h3>
      <md-button class="md-primary" ><nuxt-link to="/users">Users</nuxt-link></md-button>
      <md-button class="md-primary" v-if="!isAuthenticated"><a href="/login"> Login</a> </md-button>
      <md-button class="md-primary" v-if="!isAuthenticated"><nuxt-link to="/register"> Registration</nuxt-link> </md-button>
      <md-button class="md-primary" v-if="isAuthenticated"><nuxt-link to="/myvideos">My Video(s)</nuxt-link></md-button>
      <md-button class="md-primary" v-if="isAuthenticated"><nuxt-link to="/profile"> My Profile ({{loggedInUser.pseudo}})</nuxt-link> </md-button>
      <md-button class="md-primary" v-if="isAuthenticated"><a @click="logout"> Logout</a> </md-button>
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
        localStorage.setItem('user', null);
        this.$auth.setUser(localStorage.getItem('user'));
        await this.$auth.logout();
      },
    },
  }
</script>
