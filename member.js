function skillsMember() {
    this.skills = [];
    this.addSkill = function(skill) {
        this.skills.push(skill);
    }
    this.removeSkill = function(skill) {
        const index = this.skills.indexOf(skill);
        if (index > -1) {
            this.skills.splice(index, 1);
        }
    }
    this.getSkills = function() {
        return this.skills;
    }
}