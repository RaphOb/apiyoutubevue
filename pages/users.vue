/* eslint-disable */
<template>
    <div>
        <div v-for="user in users.data" :key="user.id">
            <Card :isUser="true" :id="user.id" :username="user.username" :pseudo="user.pseudo" :created_at="user.created_at"></Card>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import Card from '~/components/Card.vue'

  export default {
    asyncData ({ params }) {
        return axios.get(`users`)
            .then((res) => {
                console.log(res.data.data);
                return {users: res.data}
            })
    },
    components: {
        Card
    },
    state: {
        users: {
            data: []
        }
    }
  };
</script>

<style scoped>

</style>
