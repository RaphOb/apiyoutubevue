<template>
    <div>
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <h2 class="md-title">My profile</h2>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <p>
                  <strong>Username:</strong>
                  {{ loggedInUser.username }}
                </p>
                <p>
                  <strong>password:</strong>
                  {{ loggedInUser.password}}
                </p>
              </md-field>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
      name: "profile",
      computed: {
        ...mapGetters(['loggedInUser'])
      }

    }
</script>

<style scoped>

</style>
