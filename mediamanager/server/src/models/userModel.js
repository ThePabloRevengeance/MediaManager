const userSchema = new Schema({
    firstName: {
        type: String, 
       
        
    }, 

    lastName: {
        type: String, 
        
    },

    email:{
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String, 
        
    },    
    passwordCreated: password? true:false,
    hasAllData: {
        type: Boolean, 
        default: false,
        
    },                                                    

    cellNumber: {
        type: Number, 
       
    },
    
    dateOfBirth: Date,                                           
    
    verificationCode: {
         type: String
    },
    
    emailStatus: { 
        type: String,
        default: "UNVERIFIED" 
    },                                                      
            
    nationality: {
        type: String,
    }
}, )

export default model("User", userSchema);