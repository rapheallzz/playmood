const mongoose = require('mongoose') 

const filmSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true, 
      },
      video: {
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
const Film = mongoose.model('Film', filmSchema);

module.exports = Film;