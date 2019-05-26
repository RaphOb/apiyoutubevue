<template>
  <div>
    <h1>Welcome!</h1>
    <nuxt-link to="/users">
     <div class="md-app-container">
       <div class="video">
         <div v-for="video in videos.data" :key="video.id">
           <Card :name="video.name" :created_at="video.created_at"></Card>
         </div>
       </div>
     </div>
    </nuxt-link>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      asyncData ({ params }) {
        return axios.get(`http://192.168.197.131:8080/api/videos`)
          .then((res) => {
            console.log(res.data);
            return { videos: res.data }
          })
      },
        head: {
            title: 'Home page'
        }
    }
</script>
