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
                          :options="playerOptions" :playsinline="true">
            </video-player>
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
  import videoPlayer from '~/components/VideoPlayer'
  import 'video.js/dist/video-js.css'
  import 'videojs-resolution-switcher'

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
          console.log("PLAYER", this.player);
          this.player.on('resolutionchange', function() {
            console.info('source changed to %s', player.src())
          });
          // TODO mettre ça dans le src
          console.log(this.$route.query.source.substring(0, this.$route.query.source.lastIndexOf('.')) + "_720.mp4" );

          // TODO trouver un moyen de recup le videoFormat
          // if (this.videoFormat) {
          //   for (let i = 0; i < this.videoFormat.length; i++) {
          //     this.$set(this.playerOptions.sources, 0, {
          //       type: "video/mp4",
          //       src: "http://192.168.56.103:8080/videos/" + this.videoFormat[i].uri,
          //       res: parseInt(this.videoFormat[i].code),
          //       label: this.videoFormat[i].code
          //     })
          //   }
          // }

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
              source: this.$route.query.source,
              videoFormat: []
            },
            // videojs options
            playerOptions: {
              height: 360,
              autoplay: false,
              muted: true,
              controls: true,
              language: 'en',
              plugins: {
                videoJsResolutionSwitcher: {
                  default: 'low',
                  dynamicLabel: true
                }
              },
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [
                {
                  type: "video/mp4",
                  src: `http://192.168.56.103:8080/videos/${this.$route.query.source}`,
                  res : 480,
                  label: '480'
                },
                {
                  type: "video/mp4",
                  src: `http://192.168.56.103:8080/videos/${this.$route.query.source}`,
                  // webm
                  // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                  res : 360,
                  label: '360'
                },
                {
                  type: "video/mp4",
                  src: `http://192.168.56.103:8080/videos/${this.$route.query.source}`,
                  // webm
                  // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                  res : 720,
                  label: '720'
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
