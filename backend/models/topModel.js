const mongoose = require('mongoose') 

const topSchema = new mongoose.Schema({
    
    img: {
        type: String,
        required: true, 
      },
      video: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true, 
      },
      creditss: {
        type: String,
        required: true, 
      },
      creditsss: {
        type: String,
        required: true, 
      },
      title: {
        type: String,
        required: true, 
      }
}, 
{
 timestamps: true,
}
      
)

module.exports = mongoose.model('Top', topSchema)