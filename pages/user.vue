<template>
    <h1>{{ users}}</h1>
</template>

<script>
  import axios from 'axios'

  export default {
    asyncData ({ params }) {
      return axios.get(`http://192.168.197.131:8080/api/users`)
        .then((res) => {
          return { users: res.data }
        })
    }
  }
</script>

<style scoped>

</style>
