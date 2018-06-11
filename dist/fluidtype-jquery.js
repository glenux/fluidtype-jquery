/*jslint browser:true */
/*global $*/
$(function() {

	var ACTION_FILL = 1,
		ACTION_ERASE = 2;

	var defaultOptions = {
  		strings: [
  	  		"Hello!",
  	  		"How are you?"
  		],
  		waitFillDuration: 200,
  		waitEraseDuration: 2000,
  		animateDuration: 400,
  		easing: 'swing'
	};

	function FluidType ($userElem, userOptions) {
		var _$other,
			_$elem           = $userElem,
			_pauseRequested  = false,
				_currentAction   = ACTION_ERASE,
				_currentString   = 0,
				_options         = $.extend({}, defaultOptions, userOptions),
				_self			 = this;

		this.animateFill = function() {
			var str = _options.strings[_currentString];
			_$elem.html(str);
			_$elem.parent().find(_$other).remove();
			_$other = _$elem.clone();
			_$other.css({
				width: '',
				position: 'absolute',
				visibility: 'hidden',
				display: 'block',
				left: '-300%',
			});
			_$elem.parent().append(_$other);

			_$elem.velocity(
				{
					width: _$other.width()
				}, 
				{
					duration: _options.animateDuration,
					easing: _options.easing,
					complete: _self.next
				}
			);
		};

		/* 
		 * Erase 
		 */
		this.animateErase = function() {
			_$elem.velocity(
				{
					width: 0 //'= ' + _$other.width()
				}, 
				{
					duration: _options.animateDuration,
					easing: _options.easing,
					complete: _self.next
				}
			);

		};

		/* 
		 * Switch to the next action.
		 * Pause request does not affect Erase => Fill switch 
		 */
		this.next = function() {
			_currentString = (_currentString + 1) % _options.strings.length;

			switch (_currentAction) {
				case ACTION_ERASE: 
					_currentAction = ACTION_FILL;
					setTimeout( 
					 _self.animateFill.bind(_self),
					 _options.waitFillDuration 
					);
					break;
				case ACTION_FILL:  
					if (!_pauseRequested) {
						_currentAction = ACTION_ERASE;
						setTimeout(	
						 _self.animateErase.bind(_self), 
						 _options.waitEraseDuration 
						);
					}
					break;
			}
		};


		/* 
		 * Start animation (again)
		 */
		this.start = function() {
			// choose next string 
			_pauseRequested = false;
			_self.next();
		};

		/* 
		 * Request animation stop
		 */
		this.stop = function() {
			_pauseRequested = true;
		};

		/* 
		 * Set up element properties 
		 */
		function initialize() {
			_$elem.css({ 
				boxSizing: 'border-box',
				display: 'inline-block',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				verticalAlign: 'bottom',
				width: 0
			});
			_self.start();
		}
		initialize();

	}

	$.fn.fluidType = function(userOptions) {
		var $target = $(this);
		var fluidType = new FluidType($target, userOptions);
		return fluidType;
	};
});

