// tweetannotate.js

/* TODO
- move literals up into global constants
- make the non modal pop up tweeting button work too
- add options page to extension
	- add option to enforce [i.e. disable button unless some description is added ]
	- add option to change method of notice [colour/ etc]
- make proper icon
- ensure errors trapped gracefully
- ensure security privileges are minimally scoped
*/

var findTimer = -1;
var findPoll = 1000;
var toggle = false;
const AVI_URL = "https://pbs.twimg.com/";

function findTweetButton()
{
	var d = new Date();
	var x = $("div[data-testid|='tweetButton']");
	$.each( x, function( key, div ) {
	
		// this only works for the popup modal tweeting dialog
		var tweet = $(div.parentElement.parentElement.parentElement.parentElement.parentElement);
		var have_img = tweet.find("IMG");
		$.each(have_img, function( ik, iv ) {	
			var img_src = iv.src;
			var is_avatar = img_src.indexOf(AVI_URL);			
			if (is_avatar < 0 )
			{
			  	div.style.backgroundColor = "#FF0000";
				div.title = "Image Description Needed";
			}
		});
	});
}

function stopTimer()
{
	if (findTimer > 0)
	{
		clearInterval(findTimer);	
	}
}

$(document).ready(function(){
	// create timer to find tweet button - if any
	findTimer = setInterval(findTweetButton, findPoll);
	console.log("Tweet Annotate Loaded...");	
});