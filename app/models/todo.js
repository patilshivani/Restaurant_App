var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        name: String,
        price: Number,
        default: ''
    }
}); 

/*module.exports = mongoose.model('Food', {
	
		name : String,
		price : Number,
		default: ''
	
});*/