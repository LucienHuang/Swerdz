var jsonfile = require('jsonfile');
const Language = require('@google-cloud/language');
const projectId = '#1071459757335';

const languageClient = Language({
  projectId: projectId
});

// // The text to analyze
// var testText = 'Hello, world!';

// // Detects the sentiment of the text
// languageClient.detectSentiment(testText)
//   .then((results) => {
//     var sentiment = results[0];

//     console.log(`Text: ${text}`);
//     console.log(`Sentiment: ${sentiment}`);
//   });


jsonfile.spaces = 4;

var file = "temp/data.json"

var text = "";
var tempText = "";
var newWord = "";
var isWord = true;
var isThere = false;
const language = Language();

exports.changeWord = function(data, obj){
	
	isWord = true;
	var message = data;
	var words = obj.noun;
	console.log("data: "+data);
	console.log("obj: "+words);
	
    // analyzeSyntaxOfText(message, obj);
    language.detectSyntax(message)
    .then(function(results){

    	var newSentence = "";
    	console.log(results[0][0].text);
    	for(var n = 0; n<results[0].length; n++){

    		if(results[0][n].text.length<25){
    			console.log(results[0][n].tag+' '+results[0][n].text);
    			if(results[0][n].tag=="NOUN"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.noun.length; m++){
	    				if(obj.noun[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.noun.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="VERB"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.verb.length; m++){
	    				if(obj.verb[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.verb.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="PRON"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.pron.length; m++){
	    				if(obj.pron[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.pron.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="ADJ"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.adj.length; m++){
	    				if(obj.adj[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.adj.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="ADV"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.adv.length; m++){
	    				if(obj.adv[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.adv.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="DET"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.det.length; m++){
	    				if(obj.det[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.det.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="ADP"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.adp.length; m++){
	    				if(obj.adp[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.adp.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="CONJ"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.conj.length; m++){
	    				if(obj.conj[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.conj.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else if(results[0][n].tag=="PUNCT"){
    			// console.log(obj);
    			var existed = false;
	    			for(var m = 0; m<obj.punct.length; m++){
	    				if(obj.punct[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.punct.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}else{
    				var existed = false;
	    			for(var m = 0; m<obj.x.length; m++){
	    				if(obj.x[m]==results[0][n].text){
	    					existed = true;
	    				}
	    			}
	    			if(existed==false){
	    				obj.x.push(results[0][n].text);

		      			jsonfile.writeFile(file, obj, function(err){
							// console.error(err);
						});
	    			}
    			}
    		}

    		console.log(n);
    		if(results[0][n].tag=="NOUN"){
    			newSentence+=obj.noun[Math.floor(Math.random()*obj.noun.length)];
    		}else if(results[0][n].tag=="VERB"){
    			newSentence+=obj.verb[Math.floor(Math.random()*obj.verb.length)];
    		}else if(results[0][n].tag=="ADJ"){
    			newSentence+=obj.adj[Math.floor(Math.random()*obj.adj.length)];
    		}else if(results[0][n].tag=="ADV"){
    			newSentence+=obj.adv[Math.floor(Math.random()*obj.adv.length)];
    		}else if(results[0][n].tag=="PRON"){
    			newSentence+=obj.pron[Math.floor(Math.random()*obj.pron.length)];
    		}else if(results[0][n].tag=="DET"){
    			newSentence+=obj.det[Math.floor(Math.random()*obj.det.length)];
    		}else if(results[0][n].tag=="ADP"){
    			newSentence+=obj.adp[Math.floor(Math.random()*obj.adp.length)];
    		}else if(results[0][n].tag=="CONJ"){
    			newSentence+=obj.conj[Math.floor(Math.random()*obj.conj.length)];
    		}else if(results[0][n].tag=="PUNCT"){
    			newSentence+=obj.punct[Math.floor(Math.random()*obj.punct.length)];
    		}else if(results[0][n].tag=="X"){
    			newSentence+=obj.x[Math.floor(Math.random()*obj.x.length)];
    		}
    			newSentence+=' ';
    	}

    	console.log("New sentence "+newSentence);
    	return newSentence;
    });

	// for(var i = 0; i<message.length; i++){
 //        if(message.charAt(i)==' '){
 //          tempText += ' ';
 //            isWord = true;
 //        }else if(message.charAt(i)=='\,'||message.charAt(i)=='\.'||message.charAt(i)=='\?'||message.charAt(i)=='\!'||message.charAt(i)=='\''){
 //          tempText += message.charAt(i);
 //            isWord = true;
 //        }else{
 //          // tempText += possible.charAt(Math.floor(Math.random() * possible.length));
 //          // console.log(i+" "+isWord);
 //          if(isWord==true){
 //            if(newWord!=""&&newWord.length<25){
 //            isThere = false;
 //              for(var j = 0; j<words.length; j++){
 //                if(words[j]==newWord){
 //                  isThere = true;
 //                }
 //              }
 //              if(isThere==false){
 //              	console.log("tagName: "+tagArr[wordCount]);

 //              	if(1){
 //              		console.log('YES');
 //                	// obj.noun.push(newWord);
 //              	}
 //              }
 //            }
 //            newWord = "";
 //            newWord += message.charAt(i);
 //            tempText+=words[Math.floor(Math.random()*words.length)];
 //            isWord = false;
 //            wordCount++;
 //          }else{
 //            newWord+= message.charAt(i);
 //          }
 //        }
 //    }
            
 //    console.log("NEW: "+newWord);
 //    wordCount++;
 //    if(newWord!=""&&newWord.length<25){
 //    isThere = false;
 //      for(var j = 0; j<words.length; j++){
 //      	if(words[j]==newWord){
 //      		isThere = true;
 //       		}
 //   		}
 //      if(isThere==false){
 //        if(1){
 //              		console.log('YES');
 //           // obj.noun.push(newWord);
 //        }
 //      }
 //    }
 //      newWord = "";

 //            // console.log(words);
 //      text = tempText;
 //      tempText = "";

 //    console.log("Text:" + text);
 // //    jsonfile.writeFile(file, obj, function(err){
	// // 	console.error(err);
	// // });

 //    return text;
	// return obj.noun[1];
}


// function analyzeSyntaxOfText (text, objAna) {
//   // Instantiates a client
//   console.log("obj "+objAna);

//   // Instantiates a Document, representing the provided text
//   const document = language.document({
//     // The document text, e.g. "Hello, world!"
//     content: text
//   });

//   // Detects syntax in the document
//   document.detectSyntax()
//     .then((results) => {
//       const syntax = results[0];

//       // console.log('Tags:');
//       syntax.forEach((part) => {
//       	// console.log(part.text);
//       	var wordTag = part.tag;
//       	var wordText = part.text;
//       	console.log(1+wordTag);
//       	if(wordTag=='NOUN'&&wordText<=25){
//       	console.log(2);
//       	var existed = false;
//       		for(var i = 0; i<objAna.noun.length; i++){
//       			if(wordText==objAna.noun[i]){
//       				existed = true;
//       			}
//       		}
//       		console.log(wordText+" "+existed);
//       		if(existed!=true){
//       			console.log("add: "+wordText);
//       			objAna.noun.push(wordText);

//       			jsonfile.writeFile(file, objAna, function(err){
// 					// console.error(err);
// 				});
//       		}
//       	}




//       	// return part.tag;
//       	// tagArr.push(part.tag);
//       	// wordCount++;
// 		});

//       return syntax;
//     });
// }

// exports.readWords();