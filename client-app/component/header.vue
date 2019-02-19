<template lang="html">
  <div>
    <div id="header">
      <div id="user-data-wrapper">
        <div
          id="letter"
          v-bind:style="getCoverColor()"
          >
            <span>{{ getUserFirstLetter() }}</span>
        </div>
        <span id="user-name">{{ user.get('user_name') }}</span>
      </div>
      <h1>FULL STACK DEVELOPER TEST</h1>
      <a
        id="remove-session"
        href="/remove-session/"
        v-if="user.get('user_name')"
        >
        EXIT
      </a>
    </div>
    <div id="background-extension-header">
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'pageTitle',
  ],
  data() {
    return {
      user: new this.$models.User(),
    }
  },
  created() {
    this.$eventHub.$on('app-hide-login', () => {
      if(window.user)
        this.user = new this.$models.User(window.user)
    })
  },
  methods: {
    getCoverColor: function() {
      let userName = this.user.get('user_name')
      return this.$getHexColor(userName)
    },
    getUserFirstLetter: function(user) {
      if (!this.user.get('user_name')) return
      return this.user.get('user_name')[0]
    },
  },
}
</script>

<style scoped lang="css">
h1 {
  font-size: 14px;
  font-weight: 300;
  line-height: 1px;
  text-align: center;
  width: 100%;
  align-self: center;
  margin-right: 10px;
}

#header {
  color: white;
  display: flex;
  height: 48px;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0;
  transition-duration: 100ms;
  width: 100%;
  z-index: 2;
}

#background-extension-header {
  background-color: #607d8b;
  height: 140px;
  position: absolute;
  top: 0px;
  width: 100%;
}

#user-data-wrapper {
  align-self: center;
  display: flex;
  margin-left: 10px;
}

#letter {
  border-radius: 100%;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;
}

#letter span {
  align-self: center;
  color: white;
  font-size: 20px;
  font-weight: 300;
  text-transform: uppercase;
}

#user-name {
  align-self: center;
  font-size: 14px;
  font-weight: 300;
  margin-left: 5px;
  text-transform: uppercase;
}

#remove-session {
  align-self: center;
  background-color: transparent;
  color: white;
  display: flex;
  font-size: 14px;
  line-height: 1;
  margin-right: 10px;
  outline: none;
  text-decoration: none;
  font-weight: 300;
}
</style>
