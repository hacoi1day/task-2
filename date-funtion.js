// Function date
var DateFunction = {
	'daysInMonth': function() {
		return new Date(year, month, 0).getDate();
	},
	'getMonthCurrent': function() {
		date = $('#date').text();
		params = date.split('/');
		monthCurrent = parseInt(params[0]);
		return monthCurrent;
	},
	'getYearCurrent': function() {
		date = $('#date').text();
		params = date.split('/');
		yearCurrent = parseInt(params[1]);
		return yearCurrent;
	},
	'printStatus': function(start, end, status) {

		dayStart = DateFunction.getDay(start);
		dayEnd = DateFunction.getDay(end);

		monthStart = DateFunction.getMonth(start);
		monthEnd = DateFunction.getMonth(end);

		yearStart = DateFunction.getYear(start);
		yearEnd = DateFunction.getYear(end);

		html = ``;
		for(var i = 1; i <= countDay; i++) {
			if(yearStart == yearEnd && yearShow == yearStart) {
				if(monthStart == monthEnd && monthStart == monthShow) {
					if(i >= dayStart && i <= dayEnd) {
						html += `<td class="${status}"></td>`;
					} else {
						html += `<td class="status"></td>`;
					}
				} else if (monthStart < monthEnd) {
					if (monthShow == monthStart) {
						if (i >= dayStart && i <= countDay) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					}
					else if (monthShow < monthEnd) {
						if (i >= 1 && i <= countDay) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					} else if (monthShow == monthEnd) {
						if(i >= 1 && i <= dayEnd) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					} else {
						html += `<td class="status"></td>`;
					}
				}
			} else if(yearStart < yearEnd) {
				if(yearShow == yearStart) {
					if(monthShow == monthStart) {
						if(i >= dayStart && i <= countDay) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					} else {
						if(i >= 1 && i <= countDay) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					}
				} else if(yearShow > yearStart && yearShow < yearEnd) {
					if(monthShow >= 1 && monthShow <= 12) {
						if(i >= 1 && i <= countDay) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					}
				} else if(yearShow == yearEnd) {
					if(monthShow < monthEnd) {
						if(i >= 1 && i <= countDay) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					} else if(monthShow == monthEnd) {
						if(i >= 1 && i <= dayEnd) {
							html += `<td class="${status}"></td>`;
						} else {
							html += `<td class="status"></td>`;
						}
					}
				}
			}
		}
		return html;
	},
	'getDay': function(date) {
		params = date.split(' ');
		params = params[0].split('-');
		day = params[2];
		return day;
	},
	'getMonth': function(date) {
		params = date.split(' ');
		params = params[0].split('-');
		month = params[1];
		return month;
	},
	'getYear': function(date) {
		params = date.split(' ');
		params = params[0].split('-');
		year = params[0];
		return year;
	},
	'formatDate': function(date) {
		day = DateFunction.getDay(date);
		month = DateFunction.getMonth(date);
		year = DateFunction.getYear(date);
		return day + '/' + month + '/' + year;
	},
	'getAllDayInMonth': function(month, year) {
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
			day.push(DateFunction.getNameDay(days[i].getDay()));
			// lấy ra ngày
			day.push(days[i].getDate());
			result.push(day);
		}
		return result;
	},
	'getNameDay': function(dayweek) {
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
}
