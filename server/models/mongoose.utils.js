let defaultSchemaOption = {
	timestamps : {
		createdAt : 'createdon',
		updatedAt : 'modifiedon'
	}, 
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true 
	}
};

module.exports = {
	defaultSchemaOption : defaultSchemaOption
};