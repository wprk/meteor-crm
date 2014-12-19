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
			if (Session.get('showStaffMember') == 0) {
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
			var calendarEvents = getEvents();
			calendarEvents.forEach(function(calEvent) {
				events.push({
					id: calEvent._id,
					title: calEvent.title,
					allDay: calEvent.allDay,
					start: calEvent.start,
					end: calEvent.end,
					staff_member: calEvent.staff_member
				})
			});
			callback(events);
		}
	});

	Meteor.autorun(function() {
		$('#bookingsCalendar').fullCalendar('refetchEvents');
	});
}

var addCalEvent = function(calEvent, staffMember) {
	calEvent["staff_member"] = staffMember;
	Events.insert(calEvent);
	Session.set('lastSync', new Date());
}

var updateCalEvent = function(id, data) {
	console.log(data);
	Events.update(id, {$set: data});
	return true;
}

var deleteCalEvent = function(id) {
	Events.remove(id);
	return true;
}

Template.calendar.helpers({
	calendar: function() {
		var staffMemberId = Session.get('showStaffMember');
		var staffMember = Staff.findOne({_id: staffMemberId, status: true});
		if (staffMember) {
			return staffMember;
		} else {
			return {
				name: "All Staff Members"
			};
		}
	},
	showStaffMemberModal: function() {
		return Session.get('showStaffMemberModal');
	},
	showEditModal: function() {
		return Session.get('showEditModal');
	},
	showDeleteModal: function() {
		return Session.get('showDeleteModal');
	},
	lastSync: function() {
		return Session.get('lastSync');
	}
});

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
		var title = tmpl.find('#eventTitle').value;
		var staff_member = tmpl.find('#staffMember').value;
		updateCalEvent(Session.get('editEvent'), {title: title, staff_member: staff_member});
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

Template.staffMemberModal.helpers({
    staffMembers: function(){
        return Staff.find({status: true});
    }
});

Template.editEventModal.helpers({
    staffMembers: function(){
        return Staff.find({status: true});
    }
});

function getEvents() {
	var staffMemberId = Session.get('showStaffMember');
	var staffMember = Staff.findOne({_id: staffMemberId});
	if (staffMember) {
		var calendarEvents = Events.find(
			{staff_member: staffMember._id}
		);
	} else {
		var calendarEvents = Events.find();
	}
	return calendarEvents;
}