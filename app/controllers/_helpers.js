
module.exports = {
    formatErrors: function(errorsIn) {
        var response = {};
        response.success = false;

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
    returnError: function(err,res,next) {
        var response = {
            success:false,
            errors: err
        }
        res.json(response);
        return next();
    }
};
