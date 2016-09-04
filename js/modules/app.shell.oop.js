app.shell.oop = new Page({
	'parentId'		: 'app-shell-content',
	'childId' 		: 'oop-dev',
	'templateUrl'	: 'tmpl/app.shell.oop.html',
	'handlers'		: function() {

						$child = $('#oop-dev');

						$child
							.on('click', '[data-target="create-new-oop"]', _onCreateOopButtonClick)		

						function _onCreateOopButtonClick(events) {
							
							var year = $child.find('[data-target="oop-creation-year"]').val(),
								uId  = app.data.getByStorage('userInfo').id;
							
							app.data.execute({
								type    : 'POST',
								data    : {that: 'OopCreate', ownerId: uId, year: year + '-01-01'},
								callback: function(response) {
									if(response.errCode) {
										throw new Error('Oop creation error');
									} else {
										app.data.setToStorage('Oop_' + response.id, response);
										app.changePage('shell.oop.create', 'year=' + year + '&id=' + response.id);
									}									
								}
							});

						}		

					}
}); 