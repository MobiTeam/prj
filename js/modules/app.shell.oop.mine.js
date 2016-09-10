app.shell.oop.mine = new Page({
	'parentId'		: 'app-shell-content',
	'childId' 		: 'oop-created-mine',
	'templateUrl'	: 'tmpl/app.shell.oop.mine.html',
	'handlers'		: function() {

						$child = $('#oop-created-mine');
						
						$child
							.on('click', '[data-edit]',   _onEditbuttonClick)
							.on('click', '[data-delete]', _onDeletebuttonClick);	
							
						function _onEditbuttonClick(event) {
							var $et    = $(event.target),
								oopId  = $et.attr('data-edit');	

							app.changePage('shell.oop.create.step1', 'id=' + oopId);	

						}

						function _onDeletebuttonClick(event) {
							var $et    = $(event.target),
								oopId  = $et.attr('data-delete');	

							app.data.execute({
								type    : 'POST',
								data    : {that: 'OopDelete', oopId: oopId},
								callback: function(response) {
									$et.closest('tr').remove();
									if(response.errCode) {
										throw new Error('OopDeleting Error');
									} 	
								}
							})
						}

					},
	'updateData'	: function(template, cbFunction) {

		var uId 	 = app.data.getByStorage('userInfo').id,
			template = app.shell.oop.mine.getTemplate(),
			$child = $('#oop-created-mine');
										
			app.data.execute({
				type    : 'POST',
				data    : {that: 'GetUserOop', userId: uId},
				callback: function(response) {
					if(response.error) {
						$child.html('Вы еще не создали ни одного ООП. <a href="#!page=shell.oop">Перейти к созданию.</a>');
						// throw new Error('UserOopGetting Error');
					} else {
						$child.html(Mustache.to_html(template, {'items': response}));
						app.data.setToStorage('User_oop' + uId, response);
						app.buffer['User_oop_' + uId] = response;
					}
					cbFunction && cbFunction();					
				}
			})
	}				
});