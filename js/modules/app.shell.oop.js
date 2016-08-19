app.shell.oop = new Page({
	'parentId'		: 'app-shell-content',
	'childId' 		: 'oop-dev',
	'templateUrl'	: 'tmpl/app.shell.oop.html',
	'handlers'		: function() {

						$child = $('#oop-dev');

						$child
							.on('click', '[data-target="create-new-oop"]', _onCreateOopButtonClick)		

						function _onCreateOopButtonClick(events) {
							var year =$child.find('[data-target="oop-creation-year"]').val();	
							app.changePage('shell.oop.create', 'year=' + year);
						}		

					}
}); 