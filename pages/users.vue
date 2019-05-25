/* eslint-disable */
<template>
    <div>
        <div v-for="user in users.data" :key="user.id">
            <Card :id="user.id" :username="user.username" :pseudo="user.pseudo" :created_at="user.created_at"></Card>
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
            console.log(res.data);
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
