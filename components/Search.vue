<template>
  <form @submit.prevent="submit">
    <md-field>
      <md-icon>search</md-icon>
      <label>Search</label>

      <md-input type="text" v-model="search"/>
    </md-field>
  </form>

</template>

<script>
  import {axios} from "axios";

  export default {
    data() {
        return {
          search:''
        }
    },
    methods: {
      submit(event) {
        this.$router.push(`results/${this.search}`)
      }
    },
    // asyncData({params}) {
    //   axios.get(`http://192.168.197.134:8084/${params}`)
    //     .then((res) => {
    //       console.log(res.data.id)
    //       return res.data
    //     })
    // }
  }
</script>

<style scoped>

</style>
