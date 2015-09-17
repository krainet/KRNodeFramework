
module.exports = {
    formatErrors: function(errorsIn,controller,action,message) {
        var response = {
            success:false,
            controller:controller?controller:null,
            action:action?action:null,
            data:data?data:null,
            message:message?message:null
        };

        var errors = {};
        var a, e;

        for(a = 0; a < errorsIn.length; a++) {
            e = errorsIn[a];

            errors[e.property] = errors[e.property] || [];
            errors[e.property].push(e.msg);
        }
        response.errors=errors;
        return response;
    },
    formatResponse: function(controller,action,data,message){
        var response = {
            success:true,
            controller:controller?controller:null,
            action:action?action:null,
            data:data && data.length>0?data:null,
            message:message?message:null
        };
        return response;
    }
};
