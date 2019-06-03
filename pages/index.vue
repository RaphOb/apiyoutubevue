<template>
  <div>
    <!--<nuxt-link to="/users">-->
     <div>
       <div class="video">
         <div v-for="video in videos.data" :key="video.id">
           <Card :isUser="false" :id="video.id" :name="video.name" :created_at="video.created_at"></Card>
         </div>
       </div>
     </div>
    <!--</nuxt-link>-->
  </div>
</template>

<script>
  import axios from 'axios'
  import Card from '~/components/Card.vue'

    export default {
      asyncData ({ params }) {
        return axios.get(`videos`)
          .then((res) => {
            console.log(res.data);
            return { videos: res.data }
          })
      },
        head: {
            title: 'Home page'
        },
        components: {
          Card
        }
    }
</script>
