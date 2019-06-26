<template>
    <div style="padding: 10px">
      <div v-if="cardType === 'Video'">
        <nuxt-link class="link" :to="{ path:`/video/${id}`, query: {
          name:       `${name}`,
          user_id:    `${user_id}`,
          created_at: `${created_at}`,
          view:       `${view}`
        }}">
          <md-card>
            <md-card-header>
              <div class="md-title"><b>Title :</b> {{name}}</div>
            </md-card-header>

            <md-card-content>
              Created at : {{created_at}}
            </md-card-content>

            <md-card-actions>
              <md-button v-on:click="encodeVideo">Upload</md-button>
            </md-card-actions>
          </md-card>
        </nuxt-link>
      </div>
      <div v-else-if="cardType === 'User'">
        <md-card>
          <md-card-header>
            <div class="md-title"><b>Username :</b> {{username}}</div>
          </md-card-header>

          <md-card-content>
            <p>Pseudo : {{pseudo}}</p>
            <p v-if="email">Mail: {{email}}</p>
            <p>Created at : {{created_at}}</p>
          </md-card-content>

        </md-card>
      </div>
      <div v-else>
          <md-card>
            <md-card-header>
              <div class="md-title">Comment by <b>{{pseudo}}</b></div>
            </md-card-header>

            <md-card-content>
              {{body}}
            </md-card-content>

            <md-card-actions>
              <md-button>Delete</md-button>
            </md-card-actions>
          </md-card>
      </div>
    </div>
</template>


<script>
    export default {
        props: {
            id : String,
            username : String,
            pseudo : String,
            created_at : String,
            email : String,
            cardType: {
                type: String,
                required: true,
            },
            name : String,
            view : String,
            user_id : String,
            body : String,
        },

        methods: {
          encodeVideo() {

          }
        }
    }
</script>

<style scoped>
  .link:hover {
    text-decoration: none;
  }

</style>
