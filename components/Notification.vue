<template>
  <div class="is-danger">
      <h1>{{ message }}</h1>
      <p>{{ data }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: ['message', 'data']
  }
</script>
