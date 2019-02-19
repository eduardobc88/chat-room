<template lang="html">
  <div class="login-box-wrapper">
    <div class="box-content">
      <div class="title">
        Fill Basic Data
      </div>
      <p>
        {{ loginErrorMessage }}
      </p>
      <div class="form-wrapper">
        <InputText
          class="input"
          inputName="User Name"
          v-bind:inputValue="loginUserName"
          v-bind:onChangeValue="onChangeInputUserName"
          v-bind:onKeyEnter="acceptAction"
          propName=""
        >
        </InputText>
        </InputText>
        <ButtonIcon
          buttonIcon="input"
          v-bind:buttonAction="acceptAction"
          class="button"
        >
          Enter
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from './template/button-icon.vue'
import InputText from './template/input-text.vue'
export default {
  data() {
    return {
      formData: new URLSearchParams(),
      loginUserName: '',
      loginErrorMessage: '',
    }
  },
  components: {
    ButtonIcon,
    InputText,
  },
  mounted() {
    if(window.user)
      this.$eventHub.$emit('app-hide-login', '')
  },
  methods: {
    acceptAction: function() {
      this.formData.delete('user_name')
      this.formData.append('user_name', this.loginUserName)
      this.axios
        .post(this.$appBaseURL + '/api/v1/login/', this.formData)
        .then(response => {
          if (response.data.status_code) {
            this.loginErrorMessage = response.data.status_msg
            return
          }
          window.user = response.data.data.user
          this.$eventHub.$emit('app-hide-login', '')
        })
        .catch(response => {
          this.$eventHub.$emit('app-app-error', response.message)
        })
    },
    onChangeInputUserName: function(propName, value) {
      this.loginUserName = value
    },
  },
}
</script>

<style scoped lang="css">
.login-box-wrapper {
  background: rgba(0, 0, 0, 0.32);
  bottom: 0;
  display: flex;
  height: 100%;
  left: 0;
  margin: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 5;
}

.box-content {
  align-self: center;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin: auto;
  max-height: 300px;
  max-width: 500px;
  padding: 10px;
  position: relative;
  width: calc(100% - 40px);
}

.title {
  color: #616161;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 32px;
  text-align: center;
}

.box-content p {
  color: #616161;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  margin: 0px;
  text-align: center;
}

.form-wrapper {
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  right: 0;
}

.form-wrapper .button {
  margin-top: 10px;
}
</style>
