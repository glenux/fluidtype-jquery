/*jslint browser: true */
/*global $*/
$(function () {

	// prepare fluidType initialization parameters
	var options = {
  		strings: [
  	  		"<span class='red'>a technologist.</span>",
  	  		"<span class='green'>an entrepreneur.</span>",
  	  		"<span class='blue'>a humanist.</span>"
  		],
  		waitFillDuration: 200,
  		waitEraseDuration: 2000,
  		animateDuration: 400,
	};

	// get fluidType object to make it controllable by a button
	var fluidType =  $('#dynamic').fluidType(options);

	$('input[type=button]').click(function(ev) {
		var $this = $(this);
		ev.preventDefault();
		if ($this.val() === 'Play') {
			$this.val('Pause');
			fluidType.start();
		} else {
			$this.val('Play');
			fluidType.stop();
		}
	});	
});
