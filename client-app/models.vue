<script>
import {Model, Collection} from 'vue-mc'

const appApiBaseURL = '/api/v1'
const pusherIO = io()

class User extends Model {
  constructor (props) {
    super(props)
  }
  default () {
    return {
      user_name: '',
      user_registration_date: '',
    }
  }
  post () {
    let method = 'POST'
    let route = this.getRoute('post')
    let url = this.getURL(route, this.getRouteParameters())
    let data = this._attributes
    return this.getRequest({ method, url, data }).send()
  }
  routes () {
    return {
      fetch: appApiBaseURL + '/user/{_id}',
      post: appApiBaseURL + '/user/',
    }
  }
}

class Message extends Model {
  constructor (props) {
    super(props)
  }
  default () {
    return {
      message_from: '',
      message_content: '',
      message_date: '',
    }
  }
  post () {
    let method = 'POST'
    let route = this.getRoute('post')
    let url = this.getURL(route, this.getRouteParameters())
    let data = this._attributes
    return this.getRequest({ method, url, data }).send()
  }
  routes () {
    return {
      fetch: appApiBaseURL + '/message/',
      post: appApiBaseURL + '/message/',
    }
  }
}

class MessageCollection extends Collection {
  constructor (props) {
    super(props)
    this.listenPushMessages()
  }
  listenPushMessages () {
    pusherIO.on('new-message', (data) => {
      this.add(data.data)
    })
  }
  model () {
    return Message
  }
  getModelsFromResponse (response) {
    return response.getData().items
  }
  routes () {
    return {
      fetch: appApiBaseURL + '/messages/',
    }
  }
}

export default {
  User: User,
  Message: Message,
  MessageCollection: MessageCollection,
}

</script>
