var jsonfile = require('jsonfile');

jsonfile.spaces = 4;

var file = "temp/data.json"
var obj = {
	noun:['frog','snake','eggplant','sweet'],
	verb:'suck',
	adj:'attractive'
};

jsonfile.writeFile(file, obj, function(err){
	console.error(err);
})

jsonfile.readFile(file, function(err, obj) {
  // console.dir(obj)
  console.log(obj.noun[0]);
})

exports.readWords = function(data){
	
}

// exports.readWords();