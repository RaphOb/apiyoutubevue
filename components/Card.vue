<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title" v-if="isUser">{{id}} : {{username}}</div>
                <div class="md-title" v-if="!isUser">{{id}} : {{name}}</div>
            </md-card-header>

            <md-card-content v-if="isUser">
                {{pseudo}} , {{created_at}}
            </md-card-content>
            <md-card-content v-if="!isUser">
                {{created_at}}
            </md-card-content>

            <md-card-actions>
                <md-button>Action</md-button>
                <md-button>Action</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>


<script>
    export default {
        props: {
            id : String,
            username : String,
            pseudo : String,
            created_at : String,
            isUser: {
                type: Boolean,
                required: true,
            },
            name : String
        }
    }
</script>

<style scoped>

</style>