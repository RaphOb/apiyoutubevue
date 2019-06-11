<template>
  <div>
<!--    <div v-for="user in data.data" :key="user.id">-->
<!--      <Card :isUser="true" :id="user.id" :username="user.username" :pseudo="user.pseudo" :created_at="user.created_at"></Card>-->
<!--    </div>-->
    <div v-for="comment in comments.data" :key="comment.id">
      <Card :cardType="'Comment'" :body="comment.body" :id="comment.id" :pseudo="comment.user.pseudo"></Card>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Card from '~/components/Card'

  export default {
        name: "_id.vue",

        components: {
          Card
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

      state: {
        comments: {
          data: []
        }
      }
    }
</script>

<style scoped>

</style>
