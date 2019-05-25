<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">{{id}} : {{username}}</div>
            </md-card-header>

            <md-card-content>
                {{pseudo}} , {{created_at}}
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
        props: ['id', 'username', 'pseudo', 'created_at']
    }
</script>

<style scoped>

</style>