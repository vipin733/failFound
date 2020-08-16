<template>
    
    <div class="d-flex">
        
        <div class="col-md-10">
            <div class="row"> 
                <div class="col-md-2">
                    <b-avatar text="NH"></b-avatar>
                </div>
                <div class="col-md-10">
                    <b-form-textarea
                        placeholder="Add comment"
                        rows="1"
                        v-model="Comment"
                        >
                    </b-form-textarea>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <b-button block variant="primary"  @click="_createComment" v-if="!isLoging">Add </b-button>
            <b-spinner v-if="isLoging" variant="primary" label="Spinning"></b-spinner>
        </div>
    </div>
   
</template>

<script>
import errorMessage from '~/lib/errors'

export default {

    props:['story'],

    data() {
        return {
            Comment: '',
            isLoging: false
        }
    },

    methods: {
       
        async _createComment(){
            try {
                if (this.isLoging || !this.Comment) {
                    return
                }
                let data = {
                    StoryID: this.story.id,
                    Comment: this.Comment
                }
                let res = await this.$axios.post('/api/v1/story/comment/create', data )
                this.isLoging = false
                this.Comment = ''
                this.$emit('CreatedComment', res.data.data)
            } catch (error) {
                this.isLoging = false
                let errMsg = errorMessage(error.response)
                this._errorPopup('danger', 'Oops', errMsg )
            }
        }
    }
};
</script>