<template>
    <div>
        <div v-for="user in users.data" :key="user.id">
            <Card :cardType="'User'" :id="user.id" :username="user.username" :pseudo="user.pseudo" :created_at="user.created_at"></Card>
        </div>
    </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Card from '~/components/Card.vue'

  export default {
    asyncData () {
        return axios.get('/users')
            .then((res) => {
                console.log(res.data.data);
                return {users: res.data}
            })
    },
    components: {
        Card
    },

  };
</script>

<style scoped>

</style>
