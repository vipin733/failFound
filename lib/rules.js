export default {
    
    emailRules: [
        v => !!v || 'E-mail is required',
        v =>  /^[\S]+$/.test(v) || 'E-mail must be valid',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
   
    nameRules: [
        v => !!v || 'Name is required',
        v =>  /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(v) || 'Name must be valid',
        v => v.length >= 5 || 'Name must be min 5 characters'
    ],

    mobileRules: [
        v => v &&  v.length > 0 ?   /^([9]{1})([234789]{1})([0-9]{8})$/.test(v) || 'Mobile must be valid' : true,
    ],

    usernameRules:[
        v => !!v || 'Username is required',
        v => v.length >= 5 || 'Username must be min 5 characters',
        v => /^[A-Za-z0-9_-]*$/.test(v) || 'Username must be valid, only character and number',  
    ],

    currentPasswordRules:[
        v => !!v || 'Current Password is required',
        v => v.length >= 5 || 'Current Password must be min 5 characters'
    ],

    passwordRules:[
        v => !!v || 'Password is required',
        v => v.length >= 5 || 'Password must be min 5 characters'
    ],

    confirmPasswordRules:[
        v => !!v || 'Confirm Password is required',
        v => v.length >= 5 || 'Confirm Password must be min 5 characters'
    ],

    loginUsernameRules:[
        v => !!v || 'Username is required',
        v => v.length >= 5 || 'Username must be min 5 characters',
        v =>  /^[\S]+$/.test(v) || 'Username must be valid',
    ],
    
}