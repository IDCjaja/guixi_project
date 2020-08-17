<template>
  <a @click="fileClickedFunc">
    <i :class="file.icon" class="file-icon"></i>
  </a>
</template>

<script>
export default {
  props: {
    fileName: {
      type: String
    },
    responseUrl: {
      type: String
    }
  },

  computed: {
    file() {
      return {
        icon: this.getIcon()
      }
    }
  },

  methods: {
    getIcon () {
      if(!this.fileName) return ''

      const fileNameArray = this.fileName.split('.')
      switch (fileNameArray[fileNameArray.length - 1]) {
        case 'xlsx':
          return 'icon-Icon_excel'
          break
        case 'pdf':
          return 'icon-Icon_pdf'
          break
        case 'jpg':
          return 'icon-icon_image'
          break
        case 'jpeg':
          return 'icon-icon_image'
          break
        case 'png':
          return 'icon-icon_image'
          break
        case 'word':
          return 'icon-Icon_word'
          break
        case 'docx':
          return 'icon-Icon_word'
          break
        case 'doc':
          return 'icon-Icon_word'
          break
        default:
          return 'icon-Icon_file'
      }
    },

    fileClickedFunc () {
      this.$emit('fileClicked', this.fileName)
    }
  }

}
</script>

<style>
.file-icon {
  font-size: 1rem;
  color: black;
}
</style>
