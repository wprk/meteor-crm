Session.setDefault('lastSync', null);
Session.setDefault('showEditModal', false);
Session.setDefault('editEvent', null);

Template.calendar.rendered = function() {
	$('#bookingsCalendar').fullCalendar({
		'defaultView': 'agendaWeek',
		'weekMode': 'liquid',
		'minTime': '08:00:00',
		'maxTime': '20:00:00',
		'firstDay': 1,
		'hiddenDays': [7],
		'slotDuration': '00:15:00',
		'header': {
			left:   'title',
			center: '',
			right:  'today prev,next agendaDay,agendaWeek,month'
		},
		'allDayText': 'Staff Availability',
		'allDayDefault': false,
		dayClick: function( date, jsEvent, view) {
			var calEvent = null;
			switch(view.name) {
				case "month":
					calEvent = {
						title: "New Event",
						start: date.format(),
						allDay: true
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
			Session.set('lastSync', new Date());
		},
		eventClick: function( calEvent, jsEvent, view) {
			Session.set('editEvent', calEvent.id);
			Session.set('showEditModal', true);
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

Template.calendar.showEditModal = function() {
	return Session.get('showEditModal');
}

Template.eventModal.calEvent = function() {
	return Events.findOne({_id: Session.get('editEvent')});
}

Template.calendar.lastSync = function() {
	return Session.get('lastSync');
}