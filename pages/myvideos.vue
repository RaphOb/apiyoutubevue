<template>
    <div class="main">
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

    export default {
        name: "myvideos",
      components: {Card},
      asyncData() {
          // TODO retrieve id from store
          const id = 61;
          const path = 'user/' + id + '/videos';
          return axios.get(path)
            .then((res) => {
              console.log(res.data.data);
              return {videos: res.data}
            })
        }
    }
</script>

<style scoped>

</style>
