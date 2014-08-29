Session.setDefault('lastMod', new Date());

Template.calendar.rendered = function() {
	$('#bookingsCalendar').fullCalendar({
		'defaultView': 'month',
		'weekMode': 'liquid',
		'minTime': '08:00:00',
		'maxTime': '20:00:00',
		'firstDay': 1,
		'hiddenDays': [7],
		'header': {
			left:   'title',
			center: '',
			right:  'today prev,next agendaDay,agendaWeek,month'
		},
		'allDayText': 'Staff Availability',
		'allDayDefault': false,
		'lazyFetching': false,
		dayClick: function( date, jsEvent, view) {
			var calEvent = null;
			switch(view.name) {
				case "month":
					calEvent = {
						title: "New Event",
						start: date.format(),
						allDay: false
					}
				break;
				case "agendaDay":
				case "agendaWeek":
					calEvent = {
						title: "New Event",
						start: date.format(),
						end: date.add({hours: 2}).format()
					}
				break;
			}
			Events.insert(calEvent);
			Session.set('lastMod', new Date());
		},
		eventClick: function( calEvent, jsEvent, view) {
			console.log(calEvent);
		},
		events: function(start, end, timezone, callback) {
			var events = [];
			calendarEvents = Events.find();
			calendarEvents.forEach(function(calEvent) {
				events.push({
					id: calEvent._id,
					title: calEvent.title,
					allDay: calEvent.allDay,
					start: calEvent.start,
					end: calEvent.end
				})
			});
			callback(events);
		}
	});
}

Template.calendar.lastMod = function() {
	return Session.get('lastMod');
}