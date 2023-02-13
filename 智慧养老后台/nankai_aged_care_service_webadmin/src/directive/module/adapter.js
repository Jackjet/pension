const adapter = {
  bind: (el, binding, vnode) => {
    function documentHandler (e) {
      if (!el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('mouseup', el.__vueClickOutside__)
  },
  unbind: (el, binding) => {
    window.removeEventListener('onresize', el.__vueWindowsResize__)
    delete el.__vueWindowsResize__
  }
}

export default adapter
