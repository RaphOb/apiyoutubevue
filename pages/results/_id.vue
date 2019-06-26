<template>
  <div class="main" style="margin-top: 2em">
    <h2>{{$route.params}}</h2>
    {{$store.state}}
  </div>
</template>

<script>
  import Search from '~/components/Search.vue'
  export default {
    components: {
      Search
    },
    middleware: 'search',

  }
</script>

<style scoped>

</style>
