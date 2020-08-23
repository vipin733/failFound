function  _changeError(type, message, $store) {
    let data = {
      type,
      message
    }
    $store.dispatch('changeErrorData', data)
}

export default  _changeError

  


