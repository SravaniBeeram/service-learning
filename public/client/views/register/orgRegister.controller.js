(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("OrgRegisterController", OrgRegisterController);

    function OrgRegisterController(OrgInfoService,UserService,PartnerOrgInfoService,$rootScope,$location) {

        var vm = this;
        vm.orgRegister = orgRegister;

        function orgRegister(partner,org){

            console.log("click worked");

            if(!partner.firstName){
                vm.message = "Please enter a first name";
                return;
            }
            if(!partner.lastName){
                vm.message = "Please enter a last name";
                return;
            }

            if(!partner.username){
                vm.message = "Please enter an email address";
                return;
            }

            if(!org.name){
                vm.message = "Please enter organization name";
                return;
            }

            if(!org.mission){
                vm.message = "Please enter organization mission";
                return;
            }

            org.status = 'NoStatus';
            partner.role = 'PARTNER';

            console.log(org);

            OrgInfoService.addNewOrgInfo(org)
                .then(function(orgRes){

                    if(orgRes){

                        UserService.register(partner) //registering partner
                            .then(function(partnerInfo) {
                                $rootScope.currentUser = partnerInfo.data;
                                $rootScope.currentUser.orgId = orgRes.data._id;
                                var userOrgInfo = {
                                    userId : partnerInfo.data._id,
                                    organizationId : orgRes.data._id
                                };

                                PartnerOrgInfoService.addUserOrgInfo(userOrgInfo) //entering partner and organization relation
                                    .then(function(response){
                                        console.log("after add User Org",+response);
                                        $location.url("/partner");
                                    }, function(err){
                                        console.log(err);
                                    });

                            })
                    }

                });






        }

    }
})();