<template>
  <div class="main">
    <md-card style="margin: 10px">
      <md-card-header>
        <div class="md-title">
          <span>{{ video.name }}</span>
        </div>
      </md-card-header>
      <md-card-media>
        <div class="item">
          <div class="player">
            <video-player class="vjs-custom-skin" ref="videoPlayer"
                          :options="playerOptions" :playsinline="true"></video-player>
          </div>
        </div>
      </md-card-media>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <span>{{video.view}} view(s)</span>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <transition name="fade">
      <Notification :message="error" :data="data" v-if="error"/>
    </transition>
    <form novalidate class="md-layout md-alignment-center-center" style="padding: 10px;" @submit.prevent="createComment">
      <md-card class="md-layout-item">
        <md-card-header>
          Comment
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field>
                <label for="comment">Comment</label>
                <md-input name="comment" id="comment" v-model="comment"></md-input>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary">Create comment</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <div v-for="comment in comments.data" :key="comment.id">
      <Card :cardType="'Comment'" :body="comment.body" :id="comment.id" :pseudo="comment.user.pseudo"></Card>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Card from '~/components/Card'
  import { mapGetters } from 'vuex'
  import Notification from '~/components/Notification'
  import '~/assets/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
        name: "_id.vue",

        components: {
          Card,
          Notification,
          videoPlayer
        },

        computed: {
          ...mapGetters(['isAuthenticated', 'loggedInUser']),
          player() {
            return this.$refs.videoPlayer.player
          }
        },

        mounted() {
          // console.log('this is current player instance object', this.player)
          setTimeout(() => {
            console.log('dynamic change options', this.player)
            // change src
            // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
            // change item
            // this.$set(this.playerOptions.sources, 0, {
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // })
            // change array
            // this.playerOptions.sources = [{
            //   type: "video/mp4",
            //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
            // }]
            // this.player.muted(false)
          }, 5000)
        },

        data() {
          return {
            comment: '',
            error: null,
            data: null,
            video: {
              name: this.$route.query.name,
              user_id: this.$route.query.user_id,
              created_at: this.$route.query.created_at,
              view: this.$route.query.view,
              source: this.$route.query.source
            },
            // videojs options
            playerOptions: {
              height: '360',
              autoplay: false,
              muted: true,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [
                {
                  type: "video/mp4",
                  // mp4
                  src: `localhost/ETNA/API/public/videos/${this.$route.query.source}`,
                  // webm
                  // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                  res : 1
                },
                {
                  type: "video/mp4",
                  src: `localhost/ETNA/API/public/videos/${this.$route.query.source}`,
                  res : 2
                }
              ],
              poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
            }
          }
        },

        asyncData({route}) {
          const pathToComments = "/video/" + route.params.id + "/comments?perPage=10";

          try {
              return axios.get(pathToComments)
                .then((res) => {
                  console.log(res.data.data);
                  return { comments: res.data }
                })
          } catch (e) {

          }
        },

        methods: {
          async createComment() {
            const path = "/video/" + this.$route.params.id + "/comment";
            try {
              // TODO retrieve token from store
              const token = this.$auth.getToken('local').substring(7);
              await this.$axios.post(path, {
                body: this.comment
              }, {
                headers: {
                  Token: token
                }
              });
            } catch (e) {
              this.error = e.response.data.message;
              this.data = e.response.data.data;
            }
          }
        },
    }
</script>

<style scoped>

</style>
