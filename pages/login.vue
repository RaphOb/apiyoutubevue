<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-4 is-offset-4">
                    <h2 class="title has-text-centered">Login!</h2>

                    <!--<Notification :message="error" v-if="error"/>-->

                    <form method="post" @submit.prevent="login">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <input
                                        type="text"
                                        class="input"
                                        name="username"
                                        v-model="username"
                                        required
                                >
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input
                                        type="password"
                                        class="input"
                                        name="password"
                                        v-model="password"
                                        required
                                >
                            </div>
                        </div>
                        <div class="control">
                            <button type="submit" class="button is-dark is-fullwidth">Register</button>
                        </div>
                    </form>

                    <div class="has-text-centered" style="margin-top: 20px">
                       <nuxt-link>Mot de passe oublié</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "login",

        data() {
            return {
                token: '',
                error: null
            }
        },

        methods: {
            async login() {
                try {
                    await this.$axios.post('/api/auth', {
                        token : this.token
                    })
                } catch (e) {
                    this.error = e.response.data.message;
                }
            }
        }
    }
</script>

<style scoped>

</style>