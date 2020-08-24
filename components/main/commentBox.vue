<template>
    <v-card
        class="mx-auto"
    >
    <v-card-text >
        <v-row>
            <v-col  cols="12">
                <v-textarea
                    :flat="true"
                    placeholder="Add comment"
                    :rounded="true"
                    :outlined="true"
                    :rows="1"
                    v-model="Comment"
                ></v-textarea>
                <v-btn color="primary" dark @click="_createComment">Add Comment
                    <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card-text>
    </v-card>
</template>

<script>
import errorMessage from '~/lib/errors'
import  _changeError  from '~/lib/_changeError'
export default {

    props:['story'],

    data() {
        return {
            Comment: ''
        }
    },

    methods: {
       
        async _createComment(){
            try {
                if (!this.Comment) {
                    return
                }
                _changeError('success', '', this.$store)
                 this.$store.dispatch('changeLoading', true)
                let data = {
                    StoryID: this.story.id,
                    Comment: this.Comment
                }
                let res = await this.$axios.post('/api/v1/story/comment/create', data )
                
                this.Comment = ''
                this.$store.dispatch('changeLoading', false)
                this.$emit('CreatedComment', res.data.data)
            } catch (error) {
                let errMsg = errorMessage(error.response)
                this.$store.dispatch('changeLoading', false)
                _changeError('error', errMsg, this.$store)
            }
        }
    }
};
</script>