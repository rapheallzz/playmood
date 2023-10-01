const mongoose = require('mongoose') 

const fashionSchema = new mongoose.Schema({
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
const Fashion = mongoose.model('Fashion', fashionSchema);

module.exports = Fashion;