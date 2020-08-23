<template>
    <v-card
        class="mx-auto"
    >
        <v-list-item>
            <v-list-item-avatar color="grey">
                {{story.user.first_last}}
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">{{story.user.name}}</v-list-item-title>
                <v-list-item-subtitle>{{_createdAt(story.created_at)}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <!-- <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="194"
        ></v-img> -->

        <v-card-text >
           <div v-html="_content(story.content)"></div>
        </v-card-text>

        <v-card-actions>
            <v-btn
                text
                color="deep-purple accent-4"
            >
                Read
            </v-btn>
            <v-btn
                text
                color="deep-purple accent-4"
            >
                Bookmark
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import moment from 'moment'
import CommentBox from '~/components/main/commentBox'
import Comment from '~/components/main/comment'
import convert from '~/lib/jsonToHtml'
export default {

    props:['story', 'isFull'],

    components: {
        CommentBox,
        Comment
    },

    methods: {

        _content(content){
            let html = convert(content)
            return html
        },

        _editPush() {
            this.$router.push('/story/edit/'+this.story.slug)
        },

        _createdAt(time){
            return moment(time).utcOffset('+0530').fromNow()
        },

        _insertComment(comment){
            if ( this.story.comments) {
                this.story.comments.unshift(comment)
            }else{
                this.story.comments = []
                this.story.comments.unshift(comment)
            }
            this.story.comments_count++
        },
        
        async _updateLike(){
            try {
                if (!this.$auth.loggedIn) {
                    return
                }
                let data = {
                    StoryID: this.story.id
                }
                let res = await this.$axios.post('/api/v1/story/like/update', data )
                this.story.is_liked = !this.story.is_liked
                if (this.story.is_liked) {
                    this.story.like_count ++
                }else{
                    this.story.like_count --
                }
            } catch (error) {
                
            }
        }
    }
};
</script>