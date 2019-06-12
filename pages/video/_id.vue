<template>
  <div>
<!--    <div v-for="user in data.data" :key="user.id">-->
<!--      <Card :isUser="true" :id="user.id" :username="user.username" :pseudo="user.pseudo" :created_at="user.created_at"></Card>-->
<!--    </div>-->
    <div style="text-align: center; padding: 30px;">
      <h1>La vidéo</h1>
    </div>
    <Notification :message="error" :data="data" v-if="error"/>
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

  export default {
        name: "_id.vue",

        components: {
          Card,
          Notification
        },

        computed: {
          ...mapGetters(['isAuthenticated', 'loggedInUser'])
        },

        data() {
          return {
            comment: '',
            error: null,
            data: null
          }
        },

       asyncData({route}) {
          const path = "/video/" + route.params.id + "/comments";
          console.log(path);
          try {
              return axios.get(path)
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
              // this.$axios.setHeader('Token', )
              await this.$axios.post(path, {
                body: this.comment
              })

            } catch (e) {
              console.log('yes');
              this.error = e.response.data.message;
              this.data = e.response.data.data;
            }
          }
        },

      state: {
        comments: {
          data: []
        }
      }
    }
</script>

<style scoped>

</style>
