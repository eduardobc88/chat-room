<template lang="html">
  <div id="app-wrapper">
    <Header v-bind:pageTitle="pageTitle">
    </Header>
    <Login v-if="showLogin"></Login>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Header from './component/header.vue'
import Login from './component/login.vue'

export default {
  components: {
    Header,
    Login,
  },
  data: function() {
    return {
      pageTitle: 'Chat Room',
      appErrorMessage: '',
      appSuccessMessage: '',
      showSplashScreen: true,
      showLogin: true,
      ribbonTimeOut: 5000,
      splashScreenTimeout: 1000,
    }
  },
  watch: {
    appErrorMessage: function(newVal, oldVal) {
      setTimeout(this.hideRibbonErrorNotification, this.ribbonTimeOut)
    },
    appSuccessMessage: function(newVal, oldVal) {
      setTimeout(this.hideRibbonSuccessNotification, this.ribbonTimeOut)
    },
  },
  created() {
    this.initAxiosListenEvent()
    this.$eventHub.$on('app-error', errorMessage => {
      this.appErrorMessage = errorMessage
    })
    this.$eventHub.$on('app-success', successMessage => {
      this.appSuccessMessage = successMessage
    })
    this.$eventHub.$on('app-hide-login', () => {
      this.showLogin = false
    })
    setTimeout(this.hideSplashScreen, this.splashScreenTimeout)
  },
  methods: {
    initAxiosListenEvent: function() {
      this.axios.interceptors.response.use(
        response => {
          let statusCode = response.data.status_code
          if (statusCode === 3) this.showLogin = true
          return response
        },
        error => {
          return Promise.reject(error)
        },
      )
    },
    hideSplashScreen: function() {
      this.showSplashScreen = false
    },
    hideRibbonSuccessNotification: function() {
      this.appSuccessMessage = ''
    },
    hideRibbonErrorNotification: function() {
      this.appErrorMessage = ''
    },
  },
}
</script>

<style scoped lang="css">
#app-wrapper {
    display: flex;
    height: 100%;
    position: relative;
    width: 100%;
}
</style>
