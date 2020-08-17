<template>
  <div class="row">
    
    <div class="col-md-12"  v-show="isReady">
      <b-card class="mb-2  p-2">
        <b-card-text>
          <div>
            <input type="text" v-model="titleData" class="form-control"  placeholder="Story title" required>
          </div>
          <br>
          <div class="editorx_body">
            <div class id="codex-editor"/>
          </div>
          <br>
          <div class="col-md-12 text-center">
            <b-button @click="save(StoryStatus.Published)" block v-if="!isSaving" variant="primary">Share</b-button>
            <b-button @click="save(StoryStatus.Draft)" block v-if="!isSaving" variant="primary">Draft</b-button>
            <b-spinner v-if="isSaving" variant="primary" label="Spinning"></b-spinner>
          </div>
        </b-card-text>
      </b-card>
    </div>

    <div class="col-md-12" v-show="!isReady">
      <b-card class="mb-2  p-2">
        <b-card-text >
          <StoryLoader/>
        </b-card-text>
      </b-card>
    </div>

  </div>
</template>

<script>

let List, EditorJS, Header, Paragraph, ImageTool
if (process.client) {
  List = require('@editorjs/list')
  EditorJS = require('@editorjs/editorjs')
  Header = require('@editorjs/header')
  Paragraph = require('@editorjs/paragraph')
  ImageTool = require('@editorjs/image')
}
import StoryStatus from '~/lib/storyStatus'
import StoryLoader from '~/components/main/story/storyLoader'
export default {
  
  props: {
    isSaving: Boolean,
    value: Object,
    isReady: Boolean,
    title: String
  },
  
  data() {
    return {
      StoryStatus,
      titleData: this.title,
      baseUrl: this.$store.state.baseUrl
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
          }
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
};
</script>

<style lang="css" scoped >
.editorx_body {
  width: 100%;
  border: 2px solid #f1f3f5;
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