function errorMessage(errors) {
  
  try {
   
    let errorData = errors.data
    let errorMsg = ''
    if (errors.status === 500) {
      errorMsg = 'Server error'
    } else if (typeof errorData.error == 'string') {
      errorMsg = errorData.error
    } else {
      const errorsData = errorData.error
      errorMsg = Object.keys(errorsData)[0] + " " + errorsData[Object.keys(errorsData)[0]]
    }
    return errorMsg
  } catch (error) {
    return 'Server error'
  }
}

export default errorMessage
