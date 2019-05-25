/* eslint-disable */
<template>
    <div>
        <div v-for="user in users" :key="users.id">
            <Card></Card>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import Card from '~/components/Card.vue'

  export default {
    asyncData ({ params }) {
      return axios.get(`http://192.168.56.103:8080/api/users`)
        .then((res) => {
          return { users: res.data }
        })
    },
    components: {
        Card
    }
  }
</script>

<style scoped>

</style>
