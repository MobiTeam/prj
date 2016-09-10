app.shell.oop.create.step5 = new OopCreatingPage({
	'parentId'		: 'app-shell-content',
	'childId' 		: 'oop-create-step5',
	'templateUrl'	: 'tmpl/app.shell.oop.create.step5.html',
	'handlers'		: function() {
		
						app.data.execute({
							type    : 'POST',
							data    : {that: 'traningPracticeGet'},
							callback: function(response) {
									
								var data = response;	

								if(response.errCode) {
									throw new Error('OopDeleting Error');
								}

								$.get('tmpl/app.shell.oop.create.step5.checkboxes.tmpl')
									.success(function(response) {
										$('.practices').html(Mustache.to_html(response, {'items': data}));
										_bindListenters();
									})
									.error(function() {
										alert('При загрузке шаблона произошла ошибка. Повторите попытку позже.')
									})
							}
						})							

						function _bindListenters() {

							var $child = $('#oop-create-step5'),
							basicDOMTemplate = $('.app-shell-oop-step5-wrapper-company').eq(0).clone(); 
													
							$child
								.on('click', '#form-control-step5-addCompany', _onAddCompanyButtonClick)
								.on('click', '.form-control-step5-deleteCompany', _onDeleteCompanyButtonClick)
								.on('change', '[data-action="updatePractice"]', _onPracticeCheckboxChange)
								.on('keydown.autocomplete', '[data-target="app-shell-oop-create-step5-company"]', _onCompanyInputchange);

							$('<input type="button" class="form-control-btn-delete form-control-step5-deleteCompany" value="Удалить предприятие" />')
								.insertAfter(basicDOMTemplate.find('.on-delete-input-line'));	

							_markChecboxes();	

							function _onCompanyInputchange(event) {
								$(this).autocomplete({
									minLength: 1,
									source : function(request, response, url) {
										$.ajax({
								            url: 'php/repeater.php',
								            data : {that: 'FindCompanyByName', term: request.term},
								            dataType: "json",
								            type: "POST",
							           		success: function (data) {
							                    response($.map(data, function(item) {
													var loadedObj = item;
		                    						console.log(loadedObj);
		                    						loadedObj.label = item.name;
		                    						loadedObj.name  = item.name;
		                    						loadedObj.id    = item.id;
		                    						return loadedObj;
							                    }));
							                }
							            });
									},
									select : function(event, ui) {
										console.log(event, ui);
									}
							    });


								// 	    $('.person_fio').autocomplete({
							    // 	minLength: 1,
							    //  	source: function(request, response, url){

							    //         var sem = $('.content_box_sem').val() == 0 ? 1 : $('.content_box_sem').val(),
							    //             searchParam  = {term: (request.term.toLowerCase()).replace(/ё/ig, 'е'), sem : sem, year : $('.content_box_year').val()};

							    // 		$.ajax({
								   //          url: 'php/get_autocomplete_pps_chasy.php',
								   //          data : searchParam,
								   //          dataType: "json",
								   //          type: "GET",
							    //        		success: function (data) {

							    //                 response($.map(data, function(item) {

							    //                 	var loadedObj = item;
							    //                 		loadedObj.label = item.fio + " - " + translatePrizn(item.prizn);
							    //                 		loadedObj.value = item.fio;
							    //                 		loadedObj.nrec  = item.nrec;

							    //                 	return loadedObj;

							    //                 }));
							    //             }
							    //         });
							    //     },
							    //     select: function(event, ui) {

							    //     	// save to buffer
							    //     	ui.item.person_id = UNDEFINED_ID;
							    //     	_personBuffer = ui.item;
					      	
									  // 	// set form inputs
							    //     	$('.person_fio').val(ui.item.fio);
							    //     	$('.load_person').val(ui.item.wload);
							    //     	$('.hours_person').val(ui.item.wload_add);
							    //     	$('.gph_person').val(ui.item.gph);
							    //     	$('.prizn_selector').val(parseInt(ui.item.prizn));

							    //     	_changeButtonState('.add_person_button', false);

							    //     	return false;
							        		
							    //     }
							    // })
							}
							
							function _onAddCompanyButtonClick(event) {
								$('#app-shell-oop-step5-wrapper-practice')
									.append(basicDOMTemplate.clone());
							}

							function _onDeleteCompanyButtonClick(event) {
								$(event.target)
									.closest('.app-shell-oop-step5-wrapper-company')
									.remove();
							}

							function _markChecboxes() {
								
								var $inputs = $('[data-action="updatePractice"]');
								var oopId = $.getQueryParameters($.uriAnchor.makeAnchorMap().query).id;
								var practices =	app.buffer['Oop_' + oopId].getValue('practice');

								for(var practice in practices) {
									$inputs
										.filter("[value='" + practices[practice].id + "']")
										.prop("checked", true);
								}
								
							}	

							function _onPracticeCheckboxChange(event) {
								
								var action = $(event.target).prop('checked') ? 'SetPractice' : 'UnsetPractice';
								var oopId = $.getQueryParameters($.uriAnchor.makeAnchorMap().query).id;

								app.data.execute({
									type    : 'POST',
									data    : {that: action, data: [{'id': $(event.target).val()}], oopId: oopId}
								});
							}


						}

						
	}
});