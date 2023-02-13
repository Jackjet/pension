<template>
  <div id="bdtts_div_id">
    <audio id="tts_autio_id" autoplay="autoplay">
      <source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=9&text= " type="audio/mpeg">
      <embed id="tts_embed_id" height="0" width="0" src="">
    </audio>
  </div>
</template>

<script>
import Paho from '../../assets/js/paho-mqtt-min.js'

function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(32).substring(1)
}
let MathRandom = (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())

export default {
  props: {
    /**
     * type:null -- 全部
     * type:0 -- 快速抢单
     * type:1 -- 快速配单
     */
    type: {
      type: String,
      default: () => {}
    }
  },

  data () {
    return {
      client: new Paho.MQTT.Client(process.env.VUE_APP_MQTT, 8083, '/mqtt', MathRandom),
      notifications: [],
      currentUser: this.common.session('currentUser')
    }
  },
  beforeDestroy () {
    if (this.notifications.length !== 0) {
      this.notifications.forEach(element => {
        element.close()
      })
    }
  },
  created () {
    this.client.connect({
      onSuccess: this.onConnect,
      userName: '0000001e',
      password: 'de03e766c37a4c0496137d7a0427011d'
    })
    this.client.onConnectedLost = this.onConnectedLost
    this.client.onMessageArrived = this.onMessageArrived
  },

  methods: {
    /**
     * MQTT
     */
    onConnectedLost (responseObject) {
      console.log('onConnectionLost' + responseObject.errorMessage)
    },
    onMessageArrived (message) {
      // console.log(message.payloadString)
      let str = message.payloadString
      let obj = JSON.parse(str)
      if (obj.providerIds.indexOf(this.currentUser.id) > -1) {
        this.myplay(obj.message, obj.type)
      }
    },
    onConnect () {
      console.log('onConnect')
      this.client.subscribe(`order/`)
    },
    myplay (msg, type) {
      let ttsDiv = document.getElementById('bdtts_div_id')
      let ttsAudio = document.getElementById('tts_autio_id')
      ttsDiv.removeChild(ttsAudio)
      let _tpl = `<audio id="tts_autio_id" autoplay="autoplay">
                  <source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=${msg}" type="audio/mpeg">
                  <embed id="tts_embed_id" height="0" width="0" src="">
                </audio>`
      ttsDiv.innerHTML = _tpl
      ttsAudio = document.getElementById('tts_autio_id')
      ttsAudio.play()
      let notifications = this.$notify({
        title: '消息提醒',
        message: msg,
        duration: 10000,
        position: 'bottom-right'
      })
      if (type === this.type) {
        this.$emit('getList')
      }
      this.notifications.push(notifications)
    }
  }
}
</script>

<style lang="scss">
</style>
