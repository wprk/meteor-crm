Template.sidebarLeftCalendar.helpers({
    staffMembers: function(){
        return Staff.find({status: true});
    }
});