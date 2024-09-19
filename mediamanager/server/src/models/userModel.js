const userModel = {
    id: {
        type: String, 
    }, 

    username: {
        type: String, 
        
    },

    email:{
        type: String,
        require: true,
        unique: true
    },

    role: {
        type: String, 
        
    },    
    
    createdAt: {
        type: String,
    },

    updatedAt: {
        type: String,
    }
}

module.exports = userModel;