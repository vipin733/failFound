function validateFunc(data, ref) {
    let isValidData = true
    for (let i = 0; i < Object.keys(data).length; i++) {
        let isError = ref[Object.keys(data)[i]].hasError
        if (!data[Object.keys(data)[i]] || isError) {
            ref[Object.keys(data)[i]].focus()
            isValidData = false
            break
        }
    }
    return isValidData
    
}

export default  validateFunc

  


