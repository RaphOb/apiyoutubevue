<template>
    <div class="main">

      <div style="padding: 10px">
        <transition name="fade">
          <Notification :message="error" :data="data" v-if="error"/>
        </transition>

        <Search></Search>
        <form novalidate class="md-layout" @submit.prevent="validateVideo">
          <md-card class="md-layout-item">
            <md-card-header>
              <div class="md-title">Video</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field :class="getValidationClass('videoTitle')">
                    <label>Video title</label>
                    <md-input name="videoTitle" id="videoTitle" v-model="videoForm.videoTitle" :disabled="sending" required/>
                    <span class="md-error" v-if="!$v.videoForm.videoTitle.required">This field is required</span>
                    <span class="md-error" v-else-if="!$v.videoForm.videoTitle.minLength">Too few characters (4 min)</span>
                    <span class="md-error" v-else-if="!$v.videoForm.videoTitle.maxlength">Too much characters (45 max)</span>
                  </md-field>
                </div>

                <div class="md-layout-item">
                  <md-field :class="getValidationClass('videoFile')">
                    <label>Video file</label>
                    <md-file name="videoFile" id="videoFile" ref="videoFile" v-model="videoForm.videoFile" :disabled="sending"
                             accept="video/*" @change="checkTypeFile" required/>
                    <span class="md-error" v-if="!$v.videoForm.videoFile.required">This field is required</span>
                    <span class="md-error" v-else-if="!$v.videoForm.videoFile.isVideoFile">File has to be a video type file</span>
                  </md-field>
                </div>
              </div>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending"/>

            <md-card-actions>
              <md-button type="submit" class="md-primary" :disabled="sending">Upload Video</md-button>
            </md-card-actions>
          </md-card>
        </form>
        <md-snackbar :md-active.sync="videoSaved">The user {{ lastVideo }} was saved with success!</md-snackbar>
      </div>

      <div v-for="video in videos.data" :key="video.id">
        <Card
          :cardType="'Video'"
          :id="video.id"
          :name="video.name"
          :created_at="video.created_at"
          :user_id="video.user_id"
          :view="video.view">
        </Card>
      </div>
    </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Card from '~/components/Card'
  import Notification from '~/components/Notification'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import { mapGetters } from 'vuex'
  import Search from '~/components/Search.vue'


  export default {
      name: "myvideos",

      components: {
        Card,
        Notification,
        Search
      },

      mixins: [validationMixin],

      computed: {
        ...mapGetters([
          'getIdUser',
          'getToken'
        ])
      },

      data() {
        return {
          videoForm: {
            videoTitle: '',
            videoFile: null,
          },
          sending: false,
          videoSaved: false,
          lastVideo: null,
          file: null,
          isVideoFile: false,
          data: null,
          error: null
        }
      },

      validations: {
        videoForm: {
          videoTitle: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(45)
          },
          videoFile: {
            required,
            isVideoFile() {
              return this.isVideoFile
            }
          }
        }
      },

      methods: {
        getValidationClass (fieldName) {
          const field = this.$v.videoForm[fieldName];

          if (field) {
            return {
              'md-invalid': field.$invalid && field.$dirty
            }
          }
        },

        checkTypeFile(e) {
          let file = e.target.files[0];
          this.isVideoFile = file.type.includes('video');
          if (this.isVideoFile) {
            this.file = file;
          }
        },

        clearForm() {
          this.$v.$reset();
          this.videoForm.videoFile = null;
          this.videoForm.videoTitle = null;
        },

        async createVideo() {
          this.sending = true;
          const formData = new FormData();
          formData.append("source", this.file);
          formData.append("name", this.videoForm.videoTitle);

          const user_id = this.$store.getters.getIdUser();
          const token = this.$auth.getToken('local').substring(7);
          const path = '/user/' + user_id + '/video';
          try {
            await this.$axios.post(path, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Token: token
              }}
            );
            this.lastVideo = this.videoForm.videoTitle;
            this.videoSaved = true;
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

        validateVideo() {
          this.$v.$touch();

          if (!this.$v.$invalid) {
            this.createVideo()
          }
        }
      },

      asyncData({store}) {
          // TODO retrieve id from store
          console.log(store.state.auth.user);
          const id = 62;
          const path = 'user/' + id + '/videos';
        try {
          return axios.get(path)
            .then((res) => {
              console.log(res.data.data);
              return {videos: res.data}
            })
        } catch (e) {
          this.error = e.response.data.message;
          this.data = e.response.data.data;
          window.setTimeout(() => {
            this.error = null;
          }, 3000);
          return null;
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
