(function() {
    "use strict";

    angular.module("ServiceLearningApp")
        .factory("FormService",FormService);

    function FormService($http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById:findFormById,
            findAllForms:findAllForms,

            findFormsActive:findFormsActive,
            updateFormObject:updateFormObject,

            getAllOrganizationIdApplicationSubmitted:getAllOrganizationIdApplicationSubmitted,


            PartnerCreateForm:PartnerCreateForm
        };

        return api;

        function getAllOrganizationIdApplicationSubmitted() {
            console.log("client")
            return $http.get("/api/application/organizationNames/applicationSubmitted/");
        }


        function updateFormObject(form) {
            return $http.put("/api/updateFormObject/",form);
        }



        function findFormsActive() {
            return $http.get("/api/findActiveForms/");
        }

        function PartnerCreateForm(form) {
            return $http.post("/api/partnerCreateForm/",form);
        }

        function createFormForUser(userId,newForm) {
            console.log(userId)
            return $http.post("/api/user/" +userId+ "/form",newForm);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/userForms/" +userId+ "/form");
        }

        function findAllForms() {
            return $http.get("/api/allForms");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/form/" +formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/form/" +formId, newForm);
        }

        function findFormById(formId){
            return $http.get("/api/form/" +formId);
        }
    }
})();
