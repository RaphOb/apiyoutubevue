<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>{{ message }}</md-card-header>
      <md-card-content>{{ data }}</md-card-content>
    </md-card>
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: ['message', 'data']
  }
</script>
