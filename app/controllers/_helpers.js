
module.exports = {
    formatErrors: function(errorsIn,controller,action,message) {
        var response = {
            success:false,
            controller:controller?controller:null,
            action:action?action:null,
            data:null,
            message:message?message:null
        };

        var errors = {};
        var a, e;
        if(Array.isArray(errorsIn)){
            for(a = 0; a < errorsIn.length; a++) {
                e = errorsIn[a];

                errors[e.property] = errors[e.property] || [];
                errors[e.property].push(e.msg);
            }
            response.errors=errors;
        }else{
            response.errors=null;
        }
        return response;
    },
    formatResponse: function(controller,action,data,message){
        var response = {
            success:true,
            controller:controller?controller:null,
            action:action?action:null,
            data:data?data:null,
            message:message?message:null
        };
        return response;
    }
};
