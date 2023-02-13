import VueCookie from 'vue-cookies'

const theme = {
  state: {
    themeColor: VueCookie.get('theme') || 'blackGreen'
  },
  mutations: {
    setThemeColor (state, curcolor) {
      this.state.themeColor = curcolor
    }
  }
}
export default theme
