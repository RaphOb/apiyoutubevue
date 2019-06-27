<template>
  <div>
    <transition name="fade">
      <Notification :message="error" :data="data" v-if="error"/>
    </transition>
    <form method="post" class="md-layout md-alignment-center-center" style="margin-top: 20px" @submit.prevent="login">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="login">Login</label>
                <md-input type="text" id="login" name="login" v-model="username" required></md-input>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="password">Password</label>
                <md-input type="password" id="password" name="password" v-model="password" required></md-input>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import Notification from '~/components/Notification'

  export default {
    name: "login",

    components: {
      Notification
    },

    data() {
        return {
            username: '',
            password: '',
            error: null,
            data: null
        }
    },

    methods: {
      async login() {
        // TODO locale storage le token recu et se co avec autha
        try {
          const {data} = await this.$axios.post('/auth', {
              login: this.username,
              password: this.password
          });
          const token = data.data.token;
          localStorage.setItem('user', JSON.stringify(data.data.user));
          this.$auth.setUser(data.data.user);
          try {
            this.$auth.setToken('local', "Bearer " + token);
            setTimeout(async () => {
              this.$auth.setStrategy('local');
              /*setTimeout(async () => {
                await this.$auth.fetchUser();
              })*/
            });
            this.$store.commit('setIdUser', data.data.user.id);
            this.$store.commit('setToken', token);

          } catch (e) {
            console.log(e);
          }
          this.$router.push('/')
        } catch (e) {
          this.error = e.response.data.message;
          this.data = e.response.data.data;
          window.setTimeout(() => {
            this.error = null;
          }, 3000)
        }
      }
    }
  }
</script>

<style scoped>

</style>
