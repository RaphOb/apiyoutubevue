<template>
  <md-field>
    <md-icon>search</md-icon>
    <label>Search</label>
    <md-input type="text" v-model="search" />
  </md-field>
</template>

<script>
    export default {
        name: "Search",

        data() {
          return {
            search: ''
          }
        }
    }
</script>

<style scoped>

</style>
