<template>
  <div>
    <transition name="fade">
      <Notification :message="error" :data="data" v-if="error"/>
    </transition>

    <div class="md-layout" style="padding: 10px">
      <md-card class="md-layout-item md-size-50 md-small-size-100 md-alignment-center-center">
        <md-card-header>
          <h2 class="md-title">My profile</h2>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <p>
                  <strong>Username: </strong>
                </p>
                <p> {{ this.user.username }}</p>
              </md-field>
              <md-field>
                <p>
                  <strong>Email:</strong>
                </p>
                {{ this.user.email }}
              </md-field>
            </div>
          </div>
        </md-card-content>
      </md-card>

      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item">
          <md-card-header>
            <div class="md-title">Users</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('username')">
                  <label for="username">User Name</label>
                  <md-input name="username" id="username" v-model="form.username" :disabled="sending"/>
                  <span class="md-error" v-if="!$v.form.username.minLength">Invalid first name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('pseudo')">
                  <label for="pseudo">Pseudo</label>
                  <md-input name="pseudo" id="pseudo" v-model="form.pseudo" :disabled="sending"/>
                  <span class="md-error" v-if="!$v.form.pseudo.minLength">Invalid pseudo</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('password')">
                  <label for="password">Password</label>
                  <md-input type="password" id="password" name="password" v-model="form.password" :disabled="sending"/>
                  <span class="md-error"
                        v-if="!$v.form.password.maxLength">Invalid password (too much characters)</span>
                  <span class="md-error"
                        v-else-if="!$v.form.password.minLength">Invalid password (too few characters</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label for="email">Email</label>
                  <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
                            :disabled="sending"/>
                  <span class="md-error" v-if="!$v.form.email.email">Invalid email</span>
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending"/>

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Update user</md-button>
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      </form>
    </div>
  </div>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import {
      email,
      minLength,
      maxLength
    } from 'vuelidate/lib/validators'
    import Notification from '~/components/Notification'


    export default {
      name: 'profile',
      components: {
        Notification
      },
      mixins: [validationMixin],
      data: () => ({
        form: {
          username: null,
          pseudo: null,
          password: null,
          email: null,
        },
        user: {
          username: '',
          email: '',
          pseudo: ''
        },
        userSaved: false,
        sending: false,
        lastUser: null,
        data: null,
        error: null
      }),
      validations: {
        form: {
          username: {
            minLength: minLength(3)
          },
          pseudo: {
            minLength: minLength(3)
          },
          password: {
            minLength: minLength(5),
            maxLength: maxLength(18),
          },
          email: {
            email
          }
        }
      },

      mounted() {
        console.log(this.$auth.user.username);
        this.user.username = this.$auth.user.username;
        this.user.email = this.$auth.user.email;
      },

      methods: {
        getValidationClass (fieldName) {
          const field = this.$v.form[fieldName];

          if (field) {
            return {
              'md-invalid': field.$invalid && field.$dirty
            }
          }
        },
        clearForm () {
          this.$v.$reset();
          this.form.username = null;
          this.form.pseudo = null;
          this.form.password = null;
          this.form.email = null;
        },
        async saveUser () {
          this.sending = true;

          // TODO retrieve id from store
          const id = this.$store.getters.getIdUser;
          const token = this.$store.getters.getToken;
          // Instead of this timeout, here you can call your API
          const path = '/user/' + id;
          try {
            await this.$axios.put(path, {
              username: this.form.username,
              password: this.form.password,
              pseudo:   this.form.pseudo,
              email:    this.form.email
            }, {
              headers: {
                'Token' : token
              }
            });
            this.lastUser = `${this.form.username} ${this.form.pseudo}`;
            this.userSaved = true;
            this.clearForm();
          } catch (e) {
            this.error = e.response.data.message;
            this.data = e.response.data.data;
            window.setTimeout(() => {
              this.error = null;
            }, 3000)
          }
          this.sending = false;

        },
        validateUser () {
          this.$v.$touch();

          if (!this.$v.$invalid) {
            this.saveUser()
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

</style>
