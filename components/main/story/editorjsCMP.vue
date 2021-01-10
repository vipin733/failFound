<template>
  <div>
    
    <v-card  v-show="isReady">
        <v-card-title class="">
          {{isEdit ? 'Edit Story' : 'Create Story'}}
        </v-card-title>
        
        <v-container>
          <v-row >

            <v-col cols="12">
              <v-text-field
                placeholder="Story Title"
                v-model="titleData"
                ref="Username"
                :clearable="true"
              ></v-text-field>
            </v-col>

            <br>
            <v-col cols="12">
              <div class="editorx_body">
                <div class id="codex-editor"/>
              </div>
            </v-col>
            <br>

            <v-col cols="12" class="text-center">
              <v-btn
                bottom
                color="blue"
                @click="save(StoryStatus.Published)" 
                block
                v-if="!isLoging" 
              >Published</v-btn>
              <br>
              <v-btn
                bottom
                color="blue"
                @click="save(StoryStatus.Draft)"  v-if="!isLoging"
                block
                
              >Draft</v-btn>
            
            </v-col>
         </v-row>
        </v-container>
        
    </v-card>
    
    <StoryLoader v-show="!isReady"/>
    
  </div>
</template>

<script>

let List, EditorJS, Header, Paragraph, ImageTool, Embed
if (process.client) {
  List = require('@editorjs/list')
  EditorJS = require('@editorjs/editorjs')
  Header = require('@editorjs/header')
  Paragraph = require('@editorjs/paragraph')
  ImageTool = require('@editorjs/image')
  Embed = require('@editorjs/embed')
}
import StoryStatus from '~/lib/storyStatus'
import StoryLoader from '~/components/main/story/storyLoader'
export default {
  
  props: {
    value: Object,
    isReady: Boolean,
    title: String,
    isEdit: Boolean
  },

  computed: {
    isLoging(){
      return this.$store.getters.isLoading
    }
  },
  
  data() {
    return {
      StoryStatus,
      titleData: this.title,
      baseUrl: this.$store.state.baseUrl,
      isLoading: this.$store.getters.isLoading
    }
  },

  components: {StoryLoader},
  
  methods: {

    save(status) {

      editor.save().then(savedData => {
        
        if (!this.titleData) {
          return 
        }

        if (savedData.blocks && savedData.blocks.length > 0) {
          let data = {
            data: savedData,
            status,
            title: this.titleData
          }
          this.$emit('saveData', data)
        }

      })
    },

    myEditor() {
      window.editor = new EditorJS({
        holder: "codex-editor",
        autofocus: true,

        data: this.value,
        
        initialBlock: "paragraph",
        tools: {
          header: {
            class: Header,
            shortcut: "CMD+SHIFT+H"
          },
          list: {
            class: List
          },
          paragraph: {
            class: Paragraph,
            config: {
              placeholder: "Share now.."
            }
          },
          image: {
            class: ImageTool,
            config: {

              endpoints: {
                byFile: this.baseUrl + '/api/v1/media/upload/byFile',
                byUrl: this.baseUrl +'/api/v1/media/byURL',
              },

              additionalRequestHeaders: {
                'Authorization': this.$auth.getToken('local'),
              },
            }
          },
          embed: Embed
        },
        onReady: function() {
          // console.log("ready")
        },
        onChange: function() {
          // console.log("change")
        }
      })
    }
  },
  mounted() {
    // console.log(this.$auth.getToken('local'))
    this.myEditor()
  }
}
</script>

<style lang="css" scoped >
.editorx_body {
  width: 100%;
  /* border: 2px solid #f1f3f5; */
  box-sizing: border-box;
}
.ce-block--focused {
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 0.5438550420168067) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>