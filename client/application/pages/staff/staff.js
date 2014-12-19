Template.staff.helpers({
    activeStaffMembers: function(){
        return Staff.find({status: true});
    },
    inactiveStaffMembers: function(){
        return Staff.find({status: false});
    }
});