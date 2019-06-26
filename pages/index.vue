<template>
 <div class="main">

   <Search></Search>
   <div v-for="video in videos.data" :key="video.id">
     <Card
       :cardType="'Video'"
       :id="video.id"
       :name="video.name"
       :created_at="video.created_at"
       :user_id="video.user.id"
       :view="video.view">
     </Card>
   </div>
 </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Card from '~/components/Card.vue'
  import Search from '~/components/Search.vue'

    export default {
      asyncData () {
        return axios.get(`/videos`)
          .then((res) => {
            // console.log(res.data);
            return { videos: res.data }
          })
      },
      head: {
          title: 'Home page'
      },
      components: {
        Card,
        Search
      },
      mounted() {
        console.log("allo");
        console.log(this.$store.getters.getToken);
      }

    }
</script>
