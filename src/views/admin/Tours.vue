<template>
<div class="wrapper">
  <v-container fluid>
    <v-layout px-2 mb-0 column>
      <v-toolbar flat>
        <v-toolbar-title>New Article</v-toolbar-title>
      </v-toolbar>
      <v-text-field class="mb-0" flat solo label="Title" v-model="title"></v-text-field>
    </v-layout>
    <quill-editor 
      class="px-2"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption">
    </quill-editor>
    <v-layout mt-3 justify-end>
      <v-btn class="gray" @click="onClear">clear</v-btn>
      <v-btn class="amber" @click="onCreateArticle">create</v-btn>
    </v-layout>
    
    <v-layout>
      <v-flex v-for="(item, index) in articles" :key="index">
        <v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container> 
</div>
</template>

<script> 
import 'vue-quill-editor/node_modules/quill/dist/quill.core.css'
import 'vue-quill-editor/node_modules/quill/dist/quill.bubble.css'
import 'vue-quill-editor/node_modules/quill/dist/quill.snow.css'

import { mapGetters, mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'

export default { 
  components: {
    quillEditor
  },
  data () {
    return {
      content: '',
      title: '',
      editorOption: {
        // some quill options
      },
    }
  },
  computed: {
    ...mapGetters(['isSignedIn', 'signedInUser','articles']),
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  }, 
  mounted() {
    //console.log('this is current quill instance object', this.editor)
  },
  watch: {
    newForm (val) {
      if (val == false) {
        this.article = Object.assign({}, this.default)
      }
    },
    content (val) {
      console.log(val)
    },
    isSignedIn (val) {
      if (!val) {
        this.$router.push('/admin/login')
      }
    },
  },
  methods: {
    ...mapActions(['createArticle', 'addMessage']),
    onCreateArticle () {
      if (this.signedInUser && this.content !== '' && this.title !== '') {
        const article = {
          title: this.title,
          content: this.content,
          author: this.signedInUser.name,
          date: new Date().toISOString().substring(0,10)
        }
        this.createArticle(article)
        this.onClear()
      }
    },
    onClear () {
      this.content = ''
      this.title = ''
    }
    // onEditorBlur(quill) {
    //   console.log('editor blur!', quill)
    // },
    // onEditorFocus(quill) {
    //   console.log('editor focus!', quill)
    // },
    // onEditorReady(quill) {
    //   console.log('editor ready!', quill)
    // },
    // onEditorChange({ quill, html, text }) {
    //   console.log('editor change!', quill, html, text)
    //   this.content = html
    // }
  }

}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
.position {
  position: relative;
}
</style>

