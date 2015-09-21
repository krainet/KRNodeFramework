/**
 * Created by ramon on 21/09/15.
 */

module.exports = {
    newResponse: function(){
        responseTemplate = {
            success:false,
                controller:null,
                action:null,
                data:null,
                errors:null,
                message:null
        };
        return responseTemplate;
    }

    };


