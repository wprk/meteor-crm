Session.setDefault('lastSync', null);
Session.setDefault('showStaffMemberModal', false);
Session.setDefault('pendingCalEvent', false);
Session.setDefault('showEditModal', false);
Session.setDefault('showDeleteModal', false);
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
		'editable': true,
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
			if (Session.get('showStaffMember') == null) {
				Session.set('pendingCalEvent', calEvent);
				Session.set('showStaffMemberModal', true);
			} else {
				addCalEvent(calEvent, Session.get('showStaffMember'));
			}
		},
		eventClick: function( calEvent, jsEvent, view) {
			Session.set('editEvent', calEvent.id);
			Session.set('showEditModal', true);
		},
		eventDrop: function(calEvent) {
			if (calEvent.allDay)
			{
				var eventTimes = {
					start: calEvent._tart.format()
				};
			} else {
				var eventTimes = {
					start: calEvent.start.format(),
					end: calEvent.end.format()
				};
			}
			Events.update(calEvent.id, {$set: eventTimes});
		},
		eventResize: function(calEvent) {
			if (calEvent.allDay)
			{
				var eventTimes = {
					start: calEvent._tart.format()
				};
			} else {
				var eventTimes = {
					start: calEvent.start.format(),
					end: calEvent.end.format()
				};
			}
			Events.update(calEvent.id, {$set: eventTimes});
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

	Meteor.autorun(function() {
		if (Session.get('showStaffMember')) {
			var calendarEvents = Events.find({staff_member: Session.get('showStaffMember')});
			console.log('filtered');
		} else {
			var calendarEvents = Events.find();
			console.log('non-filtered');
		}
		$('#bookingsCalendar').fullCalendar('refetchEvents');
		console.log(Session.get('showStaffMember'));
	});
}

var addCalEvent = function(calEvent, staffMember) {
	calEvent[staffMember] = staffMember;
	Events.insert(calEvent);
	Session.set('lastSync', new Date());
}

var updateCalEvent = function(id, title) {
	Events.update(id, {$set: {title: title}});
	return true;
}

var deleteCalEvent = function(id) {
	Events.remove(id);
	return true;
}

Template.calendar.showStaffMemberModal = function() {
	return Session.get('showStaffMemberModal');
}

Template.calendar.showEditModal = function() {
	return Session.get('showEditModal');
}

Template.calendar.showDeleteModal = function() {
	return Session.get('showDeleteModal');
}

Template.calendar.lastSync = function() {
	return Session.get('lastSync');
}

Template.staffMemberModal.events({
	'click .save': function(evt, tmpl) {
		var staffMember = tmpl.find('#staffMember').value;
		addCalEvent(Session.get('pendingCalEvent'), staffMember);
		Session.set('showStaffMemberModal', false);
		Router.go('calendar', {staff_member: staffMember});
	},
	'click [data-dismiss="modal"]': function(evt, tmpl) {
		Session.set('showStaffMemberModal', false);
		Session.set('pendingCalEvent', null);
	}
});

Template.editEventModal.calEvent = function() {
	var calEvent = Events.findOne({_id: Session.get('editEvent')});
	return calEvent;
}

Template.editEventModal.events({
	'click .save': function(evt, tmpl) {
		updateCalEvent(Session.get('editEvent'), tmpl.find('#eventTitle').value);
		Session.set('showEditModal', false);
		Session.set('editEvent', null);
	},
	'click [data-dismiss="modal"]': function(evt, tmpl) {
		Session.set('showEditModal', false);
		Session.set('editEvent', null);
	},
	'click .delete': function(evt, tmpl) {
		Session.set('showEditModal', false);
		Session.set('showDeleteModal', true);
	}
});

Template.deleteEventModal.calEvent = function() {
	var calEvent = Events.findOne({_id: Session.get('editEvent')});
	return calEvent;
}

Template.deleteEventModal.events({
	'click [data-dismiss="modal"]': function(evt, tmpl) {
		Session.set('showDeleteModal', false);
		Session.set('EditEvent', null);
	},
	'click .delete': function(evt, tmpl) {
		deleteCalEvent(Session.get('editEvent'));
		Session.set('showDeleteModal', false);
		Session.set('editEvent', null);
	}
});