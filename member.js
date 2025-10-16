function skillMember() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/skill/member/member.html',
        scope: {
            member: '=',
            skill: '='
        },
        controller: 'SkillMemberController',
        controllerAs: 'vm',
        bindToController: true
    };
}