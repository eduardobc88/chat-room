<template lang="html">
  <BoxWrapper>
      <h2>CHAT ROOM</h2>
      <div id="messages-wrapper">
        <div
          class="message"
          v-for="(message, index) in messagesCollection.models"
          >
            <div class="message-from">
              <div
                class="letter"
                v-bind:style="getCoverColor(message.message_from)"
                >
                  <span>{{ message.message_from[0] }}</span>
              </div>
              <span class="user-name">{{ message.message_from }}</span>
            </div>
            <p class="message-content">{{ message.message_content }}</p>
            <p class="message-date">{{ message.message_date }}</p>
        </div>
      </div>
      <div id="new-message-form">
        <InputText
          class="input"
          inputName="Message"
          v-bind:inputValue="messageContent"
          v-bind:onChangeValue="onChangeInputMessage"
          v-bind:onKeyEnter="sendMessage"
          propName="" />
      </div>
  </BoxWrapper>
</template>

<script>
import BoxWrapper from './template/box-wrapper.vue'
import InputText from './template/input-text.vue'

export default {
  data() {
    return {
      user: null,
      messagesCollection: new this.$models.MessageCollection(),
      message: new this.$models.Message(),
      messageContent: '',
      timeToScrollEnd: 200,
    }
  },
  components: {
    BoxWrapper,
    InputText,
  },
  created() {
    this.getMessagesData()
    this.$eventHub.$on('app-hide-login', () => {
      if(window.user)
        this.user = new this.$models.User(window.user)
    })
  },
  mounted() {
    this.messagesCollection.on('add', ({ attribute, value }) => {
      setTimeout(this.scrollToEnd, this.timeToScrollEnd)
    })
  },
  methods: {
    getMessagesData: function() {
      this.messagesCollection
        .fetch()
        .then(response => {
          if (response.getData().status_code) {
            this.$eventHub.$emit(
              'app-error',
              response.getData().status_msg,
            )
            return
          }
        })
        .catch(err => {
          this.$eventHub.$emit('app-error', err.message)
        })
    },
    onChangeInputMessage: function(propName, value) {
      this.messageContent = value
    },
    sendMessage: function() {
      let newMessage = this.messageContent
      this.messageContent = ''
      this.message.set('message_content', newMessage)
      this.message.set({
        message_from: this.user.get('user_name'),
      })
      this.message.post()
      .then(response => {
        if (response.getData().status_code) {
          this.$eventHub.$emit(
            'app-error',
            response.getData().status_msg,
          )
          return
        }
      })
      .catch(err => {
        this.$eventHub.$emit('app-error', err.message)
      })
    },
    getCoverColor: function(userName) {
      return this.$getHexColor(userName)
    },
    scrollToEnd: function() {
      let messagesScroll = this.$el.querySelector("#messages-wrapper")
      messagesScroll.scrollTop = messagesScroll.scrollHeight
    },
  },
}
</script>

<style scoped lang="css">
h2 {
  color: #666;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  margin: 0 0 10px 0;
  text-align: center;
}

#messages-wrapper {
  background-color: rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  position: relative;
  padding: 10px;
  border-radius: 3px;
}

.message-from {
  display: flex;
}

.user-name {
  align-self: center;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  margin-left: 5px;
}

.message-content {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  margin: 0 0 5px 30px;
}

.message-date {
  color: #666;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  margin: 0 0 10px 30px;
}

.letter {
  border-radius: 100%;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
}

.letter span {
  align-self: center;
  color: white;
  font-size: 16px;
  font-weight: 300;
  text-transform: uppercase;
}
</style>
