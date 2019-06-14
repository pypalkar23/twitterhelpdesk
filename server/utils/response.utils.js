'use strict';

function responseError(err){
	return {
		status : false,
		message : 'error',
		data : {}
	};
}

function responseMessage(status, message,data){
	return {
		status : status,
		message : message,
		data : data
	};
}

function responseSuccess(data){
    return {
        status : true,
        message : 'success',
        data : data
    };
}

module.exports = {
	responseMessage : responseMessage,
	responseError	: responseError,
	responseSuccess : responseSuccess, 
};