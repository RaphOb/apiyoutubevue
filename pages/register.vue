<template>
    <div>
        <transition name="fade">
          <Notification :message="error" :data="data" v-if="error"/>
        </transition>
        <form method="post" class="md-layout md-alignment-center-center" style="margin-top: 20px" @submit.prevent="register">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Creation user</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="username">Username</label>
                                <md-input type="text" id="username" name="username" v-model="username"
                                          required></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="pseudo">Pseudo</label>
                                <md-input type="text" id="pseudo" name="pseudo" v-model="pseudo"></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="email">Email</label>
                                <md-input type="email" id="email" name="email" v-model="email" required></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="password">Password</label>
                                <md-input type="password" id="password" name="password" v-model="password"
                                          required></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary">Register</md-button>
                </md-card-actions>
            </md-card>
        </form>


        <div class="md-layout md-alignment-center-center" style="margin-top: 20px">
            Already got an account?
            <nuxt-link to="/login"> Login</nuxt-link>
        </div>

    </div>
</template>

<script>
    import Notification from '~/components/Notification'

    export default {
        components: {
            Notification
        },

        data() {
            return {
                username: '',
                pseudo: '',
                email: '',
                password: '',
                error: null,
                data: null
            }
        },

        methods: {
            async register() {
                try {
                    await this.$axios.post('/user', {
                        username: this.username,
                        pseudo: this.pseudo,
                        email: this.email,
                        password: this.password
                    });
                    const {data} = await this.$axios.post('/auth', {
                      login: this.username,
                      password: this.password
                    });
                    const token = data.data.token;
                    try {
                      this.$auth.setToken('local', "Bearer " + token);
                      setTimeout(async () => {
                        this.$auth.setStrategy('local');
                        setTimeout(async () => {
                          await this.$auth.fetchUser();
                        })
                      });
                    } catch (e) {
                      console.log(e);
                    }
                    this.$router.push('/');
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
