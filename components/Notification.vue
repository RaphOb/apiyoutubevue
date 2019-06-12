<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-50 md-small-size-100" style="background-color: #E74C3C">
      <md-card-header>
        <b class="md-title">{{ message }}</b>
      </md-card-header>
      <md-card-content>
        {{ data }}
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: ['message', 'data']
  }
</script>

<style scoped>
div {
  padding: 10px;
  color : white;
}
</style>
