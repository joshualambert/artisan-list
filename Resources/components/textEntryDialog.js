/*
 * TextEntryDialog.js
 * Component used to enter text.
 */

function TextEntryDialog(params) {
	var self = this;
	self.init(params);
}

TextEntryDialog.prototype.init = function(params) {

	var self = this;

	// Handle empty params.
	if (params === {} || typeof params.parentView === 'undefined') {
		return console.log('Menu failed to init! No parentView passed.');
	}
	parentView = params.parentView;

	// Handle custom close button text.
	if (params.closeButtonText) {
		closeButtonText = params.closeButtonText;
	} else {
		closeButtonText = 'Close';
	}

	self.returnValue = new Date();

	// Build the UI for the picker.
	var pickerShell = Ti.UI.createView({
		top:0,
		bottom:0,
		left:0,
		right:0,
		width:'100%',
		height:'100%',
		zIndex:100
	});

	var pickerBlocker = Ti.UI.createView({
		width:'100%',
		height:'100%',
		opacity:0,
		zIndex:50,
		backgroundColor:'#000'
	});

	var pickerView = Ti.UI.createView({
		width:'100%',
		height:120,
		zIndex:51,
		bottom:-273,
		backgroundColor:_.blue
	});

	var textField = Ti.UI.createTextField({
		top: 25,
		width: '80%',
		center: 0,
		backgroundColor: '#FFF'
	});

	var closeBtn = Ti.UI.createButton({
		height:55,
		bottom:0,
		title: closeButtonText,
		width: '100%',
		color: 'white',
		backgroundColor:_.green
	});

	// Add everything to the shell.
	pickerShell.add(pickerBlocker);
	pickerShell.add(pickerView);
	pickerView.add(textField);
	pickerView.add(closeBtn);

	// Create reference point to objects for use in the other methods.
	self.parentView = parentView;
	self.pickerShell = pickerShell;
	self.pickerBlocker = pickerBlocker;
	self.pickerView = pickerView;
	self.textField = textField;

	// Define the events.

	// Used to handle clicks of the blocker.
	self.blockerClickEvent = function () {
		self.close();
	};

	// Used to handle clicks of the blocker.
	self.closeBtnClickEvent = function () {
		self.close();
	};

	// Register the events.
	pickerBlocker.addEventListener('click', self.blockerClickEvent);
	closeBtn.addEventListener('click', self.closeBtnClickEvent);

};

// Used to show the time picker.
TextEntryDialog.prototype.open = function(callback) {
	var self = this;
	if (typeof callback === 'function') {
		self.callback = callback;
	} else {
		self.callback = function () {};
	}
	self.parentView.add(self.pickerShell);
	self.pickerBlocker.animate({
		opacity:0.4,
		duration:200
	}, function () {
		self.pickerView.animate({
			bottom:0,
			duration:500
		});
	});
};

// Used to hide the time picker.
TextEntryDialog.prototype.close = function() {
	var self = this;
	self.callback(self.textField.value);
	self.pickerView.animate({
		bottom:-(self.pickerView.height + 8),
		duration:500
	}, function () {
		self.pickerBlocker.animate({
			opacity:0,
			duration:200
		}, function () {
			self.parentView.remove(self.pickerShell);
		});
	});
	return;
};

module.exports = TextEntryDialog;

/*
 * EOF
 */