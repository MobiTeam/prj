app.shell.oop.create.step5 = new Page({
	'parentId'		: 'app-shell-content',
	'childId' 		: 'oop-create-step5',
	'templateUrl'	: 'tmpl/app.shell.oop.create.step5.html',
	'handlers'		: function() {
	
						var $child = $('#oop-create-step5'),
							basicDOMTemplate = $('.app-shell-oop-step5-wrapper-company').eq(0).clone(); 
						
						$child
							.on('click', '#form-control-step5-addCompany', _onAddCompanyButtonClick)
							.on('click', '.form-control-step5-deleteCompany', _onDeleteCompanyButtonClick);

						$('<input type="button" class="form-control-btn-delete form-control-step5-deleteCompany" value="Удалить предприятие" />')
							.insertAfter(basicDOMTemplate.find('.on-delete-input-line'));	

						function _onAddCompanyButtonClick(event) {
							$('#app-shell-oop-step5-wrapper-practice')
								.append(basicDOMTemplate.clone());
						}

						function _onDeleteCompanyButtonClick(event) {
							$(event.target)
								.closest('.app-shell-oop-step5-wrapper-company')
								.remove();
						}
	}
});