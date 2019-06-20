// requires jquery library
jQuery(document).ready(function() {
	jQuery(".main-table").clone(true).appendTo('#data').addClass('clone');
});

$(document).ready(function() {
	sSource = 'https://api.nextfarm.vn/api/crop/overview?cropid=1&fromdate=2019-06-01&todate=2019-06-31';
	loadAjaxTask(sSource);
	/**
	 * [loadAjaxTask gọi API và thực hiện in ra bảng dữ liệu]
	 * @param  {[type]} url [url]
	 * @return {[type]}     [none]
	 */
	function loadAjaxTask(url) {
	 	$.ajax({
	 		url: url,
	 		type: 'GET',
	 		dataType: 'json',
	 		headers: {
	 			'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLm5leHRmYXJtLnZuXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTYxMDAwNTU0LCJleHAiOjE1NjEwMzY1NTQsIm5iZiI6MTU2MTAwMDU1NCwianRpIjoiUWFyVTUxbk5XdFBEWGk2aCIsInN1YiI6MjEsInBydiI6Ijk0ZGJkOTYxYWFlZjBlM2NlNjZhZDdkNTBlNjQ3NzE3NjA5ZGRhMjQifQ.mIhcisMJd9bLF2aVSXuI-ZLda6OcqbQPPvO2OVleB5w'
	 		},
	 	})
	 	.done(function(response) {
	        // change title
	        $('#description').html('<i aria-hidden="true" class="far fa-check-circle"></i>' + response['0']['description']);
	        params = url.split('&');
	        params = params[1].split('=');
	        params = params[1].split('-');
	        yearShow = params[0];
	        monthShow = params[1];
	        allDay = getAllDayInMonth(monthShow, yearShow);
	        // lấy ra số lượng ngày trong tháng
	        countDay = allDay.length;
	        // change seasons

	        html = `<div class="table-wrap">
	        <table class="main-table">
	        <thead>
	        <tr>
	        <th rowspan="2" class="fixed-side row-head ptop" scope="col">&nbsp;</th>
	        <th rowspan="2" style="padding-top: 25px;" class="fixed-side row-head ptop" scope="col">
	        <label class="input-check">
	        <input type="checkbox" name="">
	        <span class="checkmark"></span>
	        </label>
	        </th>
	        <th rowspan="2" style="padding-top: 25px; text-transform: uppercase;" class="fixed-side row-head ptop" scope="col">Công việc</th>
	        <th rowspan="2" style="padding-top: 16px;" class="fixed-side row-head ptop text-center" scope="col">Ngày<br>bắt đầu</th>
	        <th rowspan="2" style="padding-top: 16px;" class="fixed-side row-head ptop text-center" scope="col">Ngày<br>Kết thúc</th>
	        <th rowspan="2" style="padding-top: 25px;" class="fixed-side row-head ptop" scope="col">Phụ trách</th>
	        <th colspan="${countDay}" class="fixed-side row-head select-month" style="text-align: left; background-color: #283c43; width: 1200px;" scope="col">
		        <i id="old-month" aria-hidden="true" class="fas fa-angle-left"></i>
		        <span id="date">${monthShow}/ ${yearShow}</span>
		        <i id="new-month" aria-hidden="true" class="fas fa-angle-right"></i>
	        </th>
	        </tr>
	        <tr>`;
	        for (var i = 0; i < countDay; i++)
	        {
	        	html += `<th scope="col" style="" class="day text-center">${allDay[i][0]}<br>${allDay[i][1]}</th> `;
	        }
	        html += `</tr>`;
	        html += `</thead>`;

	        if(response[0]['seasons'].length > 0) {
	        	for(var i = 0; i < response[0]['seasons'].length; i++) {
	        		html += `<tbody class="session">
	        		<tr data-toggle="collapse" data-target="#group-of-rows-${response[0]['seasons'][i]['id']}" aria-expanded="true" aria-controls="group-of-rows-1" class="clickable">
	        		<th class="fixed-side row-head" style="background-color: #ebebeb; color: black; font-weight: normal;" colspan="37">
	        		<i style="margin-right: 5px;" class="fas fa-caret-down"></i>
	        		${response[0]['seasons'][i]['name']}
	        		</th>
	        		</tr>
	        		</tbody>`;
	        		html += `<tbody id="group-of-rows-${response[0]['seasons'][i]['id']}" class="stage collapse show" style="">`;

	        		if(response[0]['seasons'][i]['tasks'].length > 0) {
	        			for (var j = 0; j < response[0]['seasons'][i]['tasks'].length; j++) {
	        				html += `<tr style="border-bottom: 1px solid gray">`;
	        				html += `<th class="fixed-side normal">${response[0]['seasons'][i]['tasks'][j]['id']}</th> 
	        				<th class="fixed-side normal">
	        				<label class="input-check">
	        				<input type="checkbox" name="">
	        				<span class="checkmark"></span>
	        				</label>
	        				</th> 
	        				<th class="fixed-side normal">${response[0]['seasons'][i]['tasks'][j]['category_name']}</th> 
	        				<th class="fixed-side normal">${formatDate(response[0]['seasons'][i]['tasks'][j]['start'])}</th>
	        				<th class="fixed-side normal">${formatDate(response[0]['seasons'][i]['tasks'][j]['end'])}</th> 
	        				<th class="fixed-side normal">${response[0]['seasons'][i]['tasks'][j]['firstname']} ${response[0]['seasons'][i]['tasks'][j]['lastname']}</th> `;


	        				start = response[0]['seasons'][i]['tasks'][j]['start'];
	        				end = response[0]['seasons'][i]['tasks'][j]['end'];
	        				status = response[0]['seasons'][i]['tasks'][j]['priority'];
	        				html += printStatus(start, end, status);
	        				html += `</tr>`;
	        			}
	        		} else {
	        			html += `<tr>`;
	        			html += `<th colspan="37" class="fixed-side normal">Không có dữ liệu</th>`;
	        			html += `</tr>`;
	        		}
	        		
	        		html += `</tbody>`;
	        	}
	        } else {
	        	html += `<tbody class="session">
	        	<tr>
	        	<th class="fixed-side row-head" style="background-color: #ebebeb; color: black; font-weight: normal;" colspan="37">
	        	Không có dữ liệu
	        	</th>
	        	</tr>
	        	</tbody>`;
	        	html += `<tbody id="group-of-rows-${response[0]['seasons'][i]['id']}" class="stage collapse" style="">`;
	        }
	        html += `</table></div>`;

	        $('#data').html(html).promise().done(function(){
	        	jQuery(document).ready(function() {
					jQuery(".main-table").clone(true).appendTo('#data').addClass('clone');
				});
				// xử lý khi chuyển tháng
				$('#old-month').click(function() {
					// hiển thị loading
					$('#loading').addClass('show-loading');
					month = getMonthCurrent();
					year = getYearCurrent();
					if(month == 1) {
						month = 12;
						year--;
					} else {
						month--;
					}
					endDay = daysInMonth(month, year);
					baseUrl = 'https://api.nextfarm.vn/api/crop/overview?cropid=1';
					if(month < 10)
						month = '0' + month;
					start = 'fromdate=' + year + '-' + month + '-' + '01';
					end = 'todate=' + year + '-' + month + '-' + endDay;
					url = baseUrl + '&' + start + '&' + end;
					loadAjaxTask(url);
				});

				$('#new-month').on('click', function() {
					// hiển thị loading
					$('#loading').addClass('show-loading');
					month = getMonthCurrent();
					year = getYearCurrent();
					if(month == 12) {
						month = 1;
						year++;
					} else {
						month++;
					}
					endDay = daysInMonth(month, year);
					baseUrl = 'https://api.nextfarm.vn/api/crop/overview?cropid=1';
					if(month < 10)
						month = '0' + month;
					start = 'fromdate=' + year + '-' + month + '-' + '01';
					end = 'todate=' + year + '-' + month + '-' + endDay;
					url = baseUrl + '&' + start + '&' + end;
					loadAjaxTask(url);
				});

				$('.clickable').on('click', function() {
					if(this.getElementsByTagName('i')[0].classList.contains('fa-caret-down')) {
						this.getElementsByTagName('i')[0].classList.add('fa-caret-up');
						this.getElementsByTagName('i')[0].classList.remove('fa-caret-down');
					} else {
						this.getElementsByTagName('i')[0].classList.remove('fa-caret-up');
						this.getElementsByTagName('i')[0].classList.add('fa-caret-down');
					}
				});
				span_date = $('#date').text();
				$('.main-table #date').one('click', function() {
					input = `<span class="input-month-year">
						<input type="text" name="month" class="input-date input-month" id="input-month" value="${monthShow}">/
						<input type="text" name="year" class="input-date input-year" id="input-year" value="${yearShow}">
					</span>`;
					$('.main-table.clone #date').html(input).promise().done(function() {
						$('#input-month').select();
						$('#input-month').keypress(function(event){
							var keycode = (event.keyCode ? event.keyCode : event.which);
							if (keycode == '13') {
								month = parseInt($('.input-month-year input:nth-child(1)').val());
								year = parseInt($('.input-month-year input:nth-child(2)').val());
								// xử lý đầu vào
								if(month <= 0 || month > 12) {
									alert('Tháng nhập chưa hợp lệ');
								} else {
									$('#loading').addClass('show-loading');
									endDay = daysInMonth(month, year);
									baseUrl = 'https://api.nextfarm.vn/api/crop/overview?cropid=1';
									if(month < 10)
										month = '0' + month;
									start = 'fromdate=' + year + '-' + month + '-' + '01';
									end = 'todate=' + year + '-' + month + '-' + endDay;
									url = baseUrl + '&' + start + '&' + end;
									loadAjaxTask(url);
								}
							}
						});
						$('#input-year').keypress(function(event){
							var keycode = (event.keyCode ? event.keyCode : event.which);
							if (keycode == '13') {
								month = parseInt($('.input-month-year input:nth-child(1)').val());
								year = parseInt($('.input-month-year input:nth-child(2)').val());
								endDay = daysInMonth(month, year);
								baseUrl = 'https://api.nextfarm.vn/api/crop/overview?cropid=1';
								if(month < 10)
									month = '0' + month;
								start = 'fromdate=' + year + '-' + month + '-' + '01';
								end = 'todate=' + year + '-' + month + '-' + endDay;
								url = baseUrl + '&' + start + '&' + end;
								loadAjaxTask(url);
							}
						});

					});
				});
			});
	    })
		.always(function() {
			$('#loading').removeClass('show-loading');
		});
	}

	/**
	 * lấy ra số ngày trong 1 tháng
	 * @param  {int} month tháng
	 * @param  {int} year  năm
	 * @return {int}       số ngày
	 */
	 function daysInMonth (month, year) {
	 	return new Date(year, month, 0).getDate();
	 }
	/**
     * Lấy tháng hiện tại
     * @return {[int]} [tháng]
     */
     function getMonthCurrent() {
     	date = $('#date').text();
     	params = date.split('/');
     	monthCurrent = parseInt(params[0]);
     	return monthCurrent;
     }
    /**
     * lấy năm hiện tại
     * @return {[int]} [năm]
     */
     function getYearCurrent() {
     	date = $('#date').text();
     	params = date.split('/');
     	yearCurrent = parseInt(params[1]);
     	return yearCurrent;
     }


	/**
	 * [printStatus in ra trạng thái]
	 * @param  {[type]} start  [ngày bắt đầu]
	 * @param  {[type]} end    [ngày kết thúc]
	 * @param  {[type]} status [trạng thái]
	 * @return {[type]}        [chuỗi html trạng thái]
	 */
	 function printStatus(start, end, status) {
	 	dayStart = getDay(start);
	 	dayEnd = getDay(end);
	 	monthStart = getMonth(start);
	 	monthEnd = getMonth(end);
	 	if(monthEnd > monthStart) {
	 		dayEnd = countDay;
	 	}
	 	html = ``;
	 	for(var i = 1; i <= countDay; i++) {
	 		if((i >= dayStart && i <= dayEnd && monthStart == monthShow) || (i >= 1 && i <= getDay(end)) && monthStart == monthShow-1) {
	 			html += `<td class="${status}"></td>`;
	 		} else {
	 			html += `<td class="status"></td>`;
	 		}
	 	}
	 	return html;
	 }
    /**
     * [getDay lấy ra ngày]
     * @param  {[type]} date [chuỗi ngày tháng và giờ]
     * @return {[type]}      [ngày - int]
     */
     function getDay(date) {
     	params = date.split(' ');
     	params = params[0].split('-');
     	day = params[2];
     	return day;
     }
    /**
     * [getDay lấy ra tháng]
     * @param  {[type]} date [chuỗi ngày tháng và giờ]
     * @return {[type]}      [tháng - int]
     */
     function getMonth(date) {
     	params = date.split(' ');
     	params = params[0].split('-');
     	month = params[1];
     	return month;
     }
    /**
     * [getDay lấy ra name]
     * @param  {[type]} date [chuỗi ngày tháng và giờ]
     * @return {[type]}      [năm - int]
     */
     function getYear(date) {
     	params = date.split(' ');
     	params = params[0].split('-');
     	year = params[0];
     	return year;
     }
    /**
     * [formatDate thay đổi dịnh dạng in ra]
     * @param  {[type]} date [huỗi ngày tháng và giờ]
     * @return {[type]}      [định dạng in ra dạng dd/mm/yyyy]
     */
     function formatDate(date) {
     	day = getDay(date);
     	month = getMonth(date);
     	year = getYear(date);
     	return day + '/' + month + '/' + year;
     }
	/**
	 * [getAllDayInMonth lấy ra tất cả các ngày trong tháng]
	 * @param  {[type]} month [tháng]
	 * @param  {[type]} year  [năm]
	 * @return {[type]}       [mảng gổm các phần từ là mảng có 2 phần từ, phần tử đầu là thứ, phần tử thứ 2 là ngày]
	 */
	 function getAllDayInMonth(month, year) {
	 	month--;
	 	var date = new Date(year, month, 1);
	 	var days = [];
	 	while (date.getMonth() === month) {
	 		days.push(new Date(date));
	 		date.setDate(date.getDate() + 1);
	 	}
	 	result = [];
	 	for(var i = 0; i < days.length; i++) {
	 		day = [];
			// lấy ra thứ
			// console.log(getNameDay(days[i].getDay()));
			day.push(getNameDay(days[i].getDay()));
			// lấy ra ngày
			// console.log(days[i].getDate());
			day.push(days[i].getDate());
			result.push(day);
		}
		return result;
	}
    /**
     * [getNameDay hàm lấy thứ trong tuần]
     * @param  {[type]} dayweek [ngày trong tuần bắt đầu từ 0 đến 6]
     * @return {[type]}         [tên ngày trong tuần bằng tiếng Anh với 2 ký tự đầu]
     */
    function getNameDay(dayweek) {
     	switch (dayweek) {
     		case 1:
     		return 'MO';
     		break;
     		case 2:
     		return 'TU';
     		break;
     		case 3:
     		return 'WE';
     		break;
     		case 4:
     		return 'TH';
     		break;
     		case 5:
     		return 'FR';
     		break;
     		case 6:
     		return 'SA';
     		break;
     		case 0:
     		return 'SU';
     		break;
     	}
    }

});