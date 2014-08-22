Template.calendar.rendered = function() {
	$('#bookingsCalendar').fullCalendar({
		'defaultView': 'agendaWeek',
		'weekMode': 'liquid',
		'firstDay': 1,
		'hiddenDays': [7],
		'header': {
			left:   'title',
			center: '',
			right:  'today prev,next agendaDay,agendaWeek,month'
		},
		'allDayText': 'Staff Availability'
	});
}