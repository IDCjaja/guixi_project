
<template>
<div class="main-content"
  ref='swipeContainer'
  v-swipe='{ length: files.length, currentIndex: currentIndex, itemWidth: itemWidth, indexChanged: indexChanged }'>
  <div class="swipe-wrapper" ref="swipeWrapperRef" :style="{ width: files.length * 100 + '%' }">
    <div class="swipe-item content-centered"
          :style='{ width: (1/files.length * 100).toFixed(6) + "%" }'
          v-for='file in files'
          :key='file._uid'
          :class='{ "real-file-preview": file.id && canPreview(file) }'>
      <div class="real-file-container" v-if='file.id && canPreview(file)'>
        <img :src="_previewUrl(file)" alt="图片载入中" />
      </div>
      <div class="preview-container" v-else>
        <div class="attachment-type">
          <file class="file-icon" :fileName="file.value" />
        </div>
        <h3 class="attachment-name force-break">{{ file.value }}</h3>
        <div class="attachment-size date-text">{{ file.humanSize }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import File from './File'
import FilePreviewMixin from '../../mixin/swipe'

export default {
  mixins: [FilePreviewMixin],

  props: {
    enableDelete: {
      type: Boolean,
      default: true
    },
    files: {
      type: Array,
      default: () => ([])
    }
  },

  components: { File },

  data () {
    return {
      currentFile: null,
      currentIndex: 0
    }
  },

  created () {
    this.currentFile = this.files[this.currentIndex]
  },

  watch: {
    currentIndex (value) {
      this.currentFile = this.files[value]
    }
  },

  methods: {
    indexChanged (index) {
      this.currentIndex = index
      this.$emit('indexChanged', index)
    },

    canPreview (file) {
      const fileNameArray = file.value.split('.')
      return _.includes(['png', 'jpg', 'jpeg'], fileNameArray[fileNameArray.length - 1])
    },

    downloadFile () {
      window.open(this._downloadUrl(this.currentFile))
    },

    _downloadUrl (file) {
      return `https://gxzh.cdht.gov.cn/attachments/${file.id}/download_url`
    },

    _previewUrl (file) {
      return `https://gxzh.cdht.gov.cn/attachments/${file.id}/download_url?fops=imageView2/0/q/100|imageslim`
    }
  }
}
</script>
<style>
.main-content {
  -webkit-box-flex: 0;
  height: calc(100vh - 2.5rem);
  overflow: hidden;
}

.swipe-wrapper {
  height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.swipe-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.real-file-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.real-file-container img {
  max-height: 100%;
  max-width: 100%;
}

.preview-container {
  margin-top: -0.5 * 2.5rem;
  width: 16.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-container .attachment-type {
  width: 6rem;
  height: 6rem;
  align-self: center;
  margin: 0;
  margin-bottom: .8rem;
}

.preview-container .attachment-type i {
    font-size: 2.3rem;
  }

.preview-container .attachment-name {
  font-weight: normal;
  font-size: 0.85rem;
}

.preview-container .attachment-size {
  line-height: 1.5rem;
  font-size: .65rem;
}

.file-icon i {
  font-size: 6rem !important;
}
</style>
