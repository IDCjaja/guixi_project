<template>
  <div>
    <home-header :companyName="baseCompany" class="bg">
      <template slot="communityBreadcrumns">
        <div class="description">{{ baseDescription }}</div>
      </template>
      <template slot="fieldsList">
        <div class="company-body">
          <div class="head">
            <div class="title">{{ company }}</div>
            <button @click="goToUrl(companyQueryUrl)">企业自查上报</button>
          </div>
          <div class="list">
            <div class="list-item">
              <div class="left-head">治安责任书</div>
              <div class="right-body">
                <File
                  :fileName="generateFileName(information.public_security_responsibility_letter)"
                  @fileClicked="fileClickedFunc"
                />
              </div>
            </div>
            <div class="list-item">
              <div class="left-head">
                <div class="title">花名册</div>
                <button @click="goToUrl(updateUrl)" class="up-button">更新</button>
              </div>
              <div class="right-body">
                <File
                  :fileName="generateFileName(information.roster)"
                  @fileClicked="fileClickedFunc"
                />
              </div>
            </div>
            <div class="list-item">
              <div class="left-head">登记表</div>
              <div class="right-body">
                <File
                  :fileName="generateFileName(information.registration_form)"
                  @fileClicked="fileClickedFunc"
                />
              </div>
            </div>
            <div class="list-item">
              <div class="left-head">单位调查表</div>
              <div class="right-body">
                <File
                  :fileName="generateFileName(information.work_unit_questionnaire)"
                  @fileClicked="fileClickedFunc"
                />
              </div>
            </div>
            <div class="list-item">
              <div class="left-head">网格员工作痕迹</div>
              <div class="right-body">
                <File
                  :fileName="generateFileName(information.grid_work_traces)"
                  @fileClicked="fileClickedFunc"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </home-header>
    <div class="layer-page" v-if="filePreviewShow">
      <div class="layer-header">
        <div class="layer-back" @click="closeFilePreviewFunc">
          <svg viewbox="0 0 24 24" width="100%" height="100%">
            <path d="M9.35 12l6.36 6.36a1 1 0 0 1-1.41 1.42l-7.02-7.02a1 1 0 0 1-.05-1.46l7.06-7.08a1 1 0 1 1 1.42 1.42L9.35 12z" fill="#fd7d58"></path>
          </svg>
        </div>
        <div class="layer-content">
          {{index + 1}} / {{files.length}}
        </div>
        <div class="layer-download" @click="downloadFile">
          <svg t="1577696122018" class="icon" viewBox="0 0 1024 1024"  width="100%" height="100%">
            <path d="M605.333333 772.672L533.333333 830.272V533.333333a21.333333 21.333333 0 0 0-42.666666 0v296.938667l-72-57.6a21.333333 21.333333 0 0 0-26.666667 33.322667l106.666667 85.333333a21.376 21.376 0 0 0 26.666666 0l106.666667-85.333333a21.333333 21.333333 0 1 0-26.666667-33.322667z" fill="#fd7d58" p-id="1900"></path>
            <path d="M810.666667 384c-1.130667 0-2.24 0-3.328 0.042667a298.496 298.496 0 0 0-565.418667-84.906667A213.333333 213.333333 0 0 0 256 725.333333h21.333333a21.333333 21.333333 0 0 0 0-42.666666h-21.333333a170.666667 170.666667 0 0 1 0-341.333334 21.333333 21.333333 0 0 0 19.712-13.12 255.786667 255.786667 0 0 1 491.370667 80.832 21.333333 21.333333 0 0 0 24.533333 19.626667A124.224 124.224 0 0 1 810.666667 426.666667a128 128 0 0 1 0 256h-64a21.333333 21.333333 0 0 0 0 42.666666h64a170.666667 170.666667 0 0 0 0-341.333333z" fill="#fd7d58" p-id="1901"></path>
          </svg>
        </div>
      </div>
      <div class="layer-body">
        <file-preview ref="filePreviewRef" :files="files" @indexChanged="indexChangedFunc" />
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from './pages/header'
import File from './enterprise/File'
import axios from 'axios'
import FilePreview from './enterprise/file_preview'
import _ from 'lodash'

export default {
  name: 'Enterprise',

  data () {
    return {
      company: '',
      responseUrl: '',
      roster: '',
      filePreviewShow: false,
      companyQueryUrl: 'http://scldrk.com:9080/',
      updateUrl: 'https://gxzh.cdht.gov.cn/namespaces/1/yet_another_workflow/flows/488/journeys/new',
      information: {},
      authorize: true,
      showButton: true,
      files: [],
      index: 0,
    }
  },

  components: {
    HomeHeader,
    File,
    FilePreview
  },

  created () {
    document.title = '一牌一簿'
    const { query: { company } } = this.$route
    this.company = company
    this.doRequst()
  },

  methods: {
    goToUrl (url) {
      location.href = url
    },

    doRequst () {
      axios.get(`https://gxzh.cdht.gov.cn/house/enterprise?company=${this.company}`).then(({ data: [data] }) => {
        this.information = data || {}
      })
    },

    fileClickedFunc (fileName) {
      this.url = fileName
      axios.get(`https://gxzh.cdht.gov.cn/api/v4/forms/72/responses`, {
        headers: {
          Authorization: '7372dee4ff2e6b3876e3b386a336a9171444fba5d3a1e5ae3e23c91d92bb68c6:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lc3BhY2VfaWQiOjF9.WXenxuBIxXEgy_YSmk-PRoElIK7f_gP995N5vdCqSAo'
        }
      }).then(res => {
        const response = _.find(res.data, item => item.id === this.information.response_id)
        const mappedValues = response.mapped_values
        switch (fileName) {
          case this.generateFileName(this.information.public_security_responsibility_letter):
            this.files = mappedValues.public_security_responsibility_letter.value
            break
          case this.generateFileName(this.information.roster):
            this.files = mappedValues.roster.value
            break
          case this.generateFileName(this.information.registration_form):
            this.files = mappedValues.registration_form.value
            break
          case this.generateFileName(this.information.work_unit_questionnaire):
            this.files = mappedValues.work_unit_questionnaire.value
            break
          case this.generateFileName(this.information.grid_work_traces):
            this.files = mappedValues.grid_work_traces.value
            break
          default:
            this.files = null
          }
        this.filePreviewShow = true
      })
    },

    closeFilePreviewFunc () {
      this.filePreviewShow = false
      this.index = 0
    },

    downloadFile () {
      this.$refs.filePreviewRef.downloadFile()
    },

    indexChangedFunc (index) {
      this.index = index
    },

    generateFileName(filename) {
      return _.reduce(filename, (acc, item, key) => {
        return `${acc}, ${key}`
      }, '')
    }
  }
}
</script>

<style scoped>
.bg {
  position: absolute;
  background: url(../../public/guixi_app/img/image_bg.png) no-repeat;
  background-size: cover;
  top: 0rem;
  bottom: 0rem;
  right: 0rem;
  left: 0rem;
  margin: 0 auto;
  overflow: auto;
}

.bg {
  padding: 0rem 1rem;
}

.description {
  margin-top: 0.4rem;
  font-size: 0.7rem;
  color: #bdbdbd;
  line-height: 1.5;
  text-align: right;
}

.community-home-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.company-body {
  width: 100%;
  background-color: white;
  border-radius: 0.3rem;
  padding: 0 0.9rem;
}

.company-body > .head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.05rem solid #e9eaeb;
}

.company-body > .head > button {
  height: 1.4rem;
  padding: 0 0.6rem;
  font-size: 0.6rem;
  color: white;
  line-height: 1.5;
  background: linear-gradient(#f08200, #f45e06);
  border-radius: 0.3rem;
}

.company-body > .head > .title {
  height: 2.25rem;
  font-size: 0.7rem;
  color: #95a4b3;
  line-height: 1.5;
  display: flex;
  align-items: center;
}

.company-body .list-item {
  height: 2.25rem;
  font-size: 0.6rem;
  color: #8d8d8d;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.05rem solid #e9eaeb;
}
.company-body .list-item > .left-head {
  display: flex;
}

.company-body .list-item > .left-head > .up-button {
  padding: 0 0.6rem;
  font-size: 0.6rem;
  color: #f08200;
  border: 1px solid #f08200;
  border-radius: 0.2rem;
  margin-left: 0.6rem;
  background: transparent;
}

.error-correction-button {
  height: 2rem;
  width: 100%;
  font-size: 0.7rem;
  color: white;
  line-height: 1.5;
  background: linear-gradient(#f08200, #f45e06);
  margin: 1.2rem 0 1.6rem;
  border-radius: 0.3rem;
}

.layer-page {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: #ffffff;
}

.layer-header {
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  top: 0;
  height: 2.5rem;
  padding: 0 2.65rem;
}

.layer-back {
  width: 1.05rem;
  height: 1.05rem;
}

.layer-content {
  flex: auto;
  color: #2e2e2e;
  font-size: 1rem;
  text-align: center;
}

.layer-download {
  width: 1.05rem;
  height: 1.05rem;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal.open {
  display: flex;
}

.modal > .content {
  width: 90%;
  height: 80%;
  font-size: 0.7rem;
  color: #8d8d8d;
  text-align: center;
  background-color: white;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1.6875rem;

}

.modal > .content > button {
  position: absolute;
  right: 2px;
  top: 2px;
  width: 40px;
  height: 20px;
  border-radius: 5px;
}
.modal > .content > iframe {
  height: 43.75rem;
  border-radius: .1875rem;
}

.modal > .content > p {
  line-height: 1.5;
}

.view-company-button {
  height: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  line-height: 1.5;
  background: linear-gradient(#f08200,#f45e06);
  margin: 24px 0 32px;
  border-radius: 6px;
}
</style>
