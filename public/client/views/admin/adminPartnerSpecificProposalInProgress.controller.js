(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminPartnerSpecificInProgressController",AdminPartnerSpecificInProgressController);

    var partners=[
        {_id: "123", name: "alice", applicationId:"1", a1:"First app 123"},
        {_id: "234", name: "bob", applicationId:"2" },
        {_id: "345", name: "charly", applicationId:"3" },
        {_id: "456", name: "jannunzi", applicationId:"4" }
    ]

    var partnerApps=[
        {_id:"123" ,applicationId:"1", name:"First app 123" },
        {_id:"123" ,applicationId:"2", name:"Second app 123" },
        {_id:"123" ,applicationId:"3", name:"Third app 123" },
        {_id: "234",applicationId:"1", name:"First app 234" },
        {_id: "234",applicationId:"2", name:"Second app 234" }
    ]


    function AdminPartnerSpecificInProgressController($rootScope,$location,$routeParams,$scope,$http,ApplicationInfoService,OrgInfoService) {
        var vm = this;
        vm.aid = $routeParams.aid;
        vm.pid = $routeParams.pid;
        vm.pApplications=[];
        function init(){
            // vm.partners=partners;
            ApplicationInfoService.getAllOrganizationIdApplicationInProgress()
                .then(
                    function (response) {

                        var applicationData=response.data;
                        var organizationIds=[];
                        vm.partners=[];
                        for(var i in applicationData)
                        {
                            OrgInfoService.getAllPartnerNamesApplicationsInProgress(applicationData[i].organizationId)
                                .then(
                                    function (response2) {
                                        var organizationName=response2.data;
                                        vm.partners.push(organizationName);
                                    }
                                )
                        }



                    }
                )

            ApplicationInfoService.getSpecificOrganizationInProgress(vm.pid)
                .then(
                    function (response) {
                        vm.pApplications=response.data;
                    }
                )



            // for (var i in partnerApps)
            // {
            //     if(partnerApps[i]._id===vm.pid)
            //     {
            //         vm.pApplications.push(partnerApps[i]);
            //     }
            // }

        }init();


    }
})();