<template>
    <div class="pt-1" v-if="comment">
        
        <v-card
            class="mx-auto"
        >
            <v-list-item>
                <v-list-item-avatar color="grey">
                    {{comment.user.first_last}}
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">{{comment.user.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{_createdAt(comment.created_at)}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            
            <v-card-text >
                {{comment.comment}}
            </v-card-text>

            <v-card-actions v-if="_isMe">
                <v-btn icon @click="_deleteComment">
                    <v-icon >mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
            
        </v-card>
    </div>
</template>

<script>
import moment from 'moment'
import errorMessage from '~/lib/errors'
import  _changeError  from '~/lib/_changeError'
export default {

    props:['comment'],

    computed: {
        _isMe(){
            if (this.$auth.loggedIn) {
                if (this.comment.user.id == this.$auth.user.data.id) {
                    return true
                }
            }

            return false
        }
    },

    methods: {

        _createdAt(time){
            return moment(time).utcOffset('+0530').fromNow()
        },

            
        async _deleteComment(){
            try {
                if (!this.$auth.loggedIn) {
                    return
                }
                _changeError('success', '', this.$store)
                this.$store.dispatch('changeLoading', true)
                let data = {
                    CommentID: this.comment.id
                }
                await this.$axios.post('/api/v1/story/comment/delete', data )
                this.$store.dispatch('changeLoading', false)
                this.$emit('deleteComment')
            } catch (error) {
                let errMsg = errorMessage(error.response)
                this.$store.dispatch('changeLoading', false)
                _changeError('error', errMsg, this.$store)
            }
        }
    }
}
</script>