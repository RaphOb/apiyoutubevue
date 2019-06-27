<template>
  <div class="main" style="margin-top: 2em">
    <h2>{{$route.params}}</h2>
    {{video}}
  </div>
</template>

<script>
  import Search from '~/components/Search.vue'
  import axios from 'axios'
  export default {
    components: {
      Search
    },
    asyncData({params}) {
      return axios.get(`http://192.168.197.135:8084/api/queries?queri=${params.id}`)
        .then((response) => {
          return {video: response.data}
        });
    },


  }
</script>

<style scoped>

</style>
