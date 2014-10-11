aspe.DataStorage = function () {
	var storage = {};

	return {
		get: function(name) {
			var storage_obj = _.toObject(localStorage.getItem(name));
			if(!!storage_obj && (storage_obj.val===0 || !!storage_obj.val) && (storage_obj.ts===0 || !!storage_obj.ts)) {
				if(storage_obj.ts === -1) {
					return storage_obj.val;
				} else {
					var now_ts = (new Date()).valueOf();
					if(storage_obj.ts < now_ts) {
						this.clear(name);
						return null;
					} else {
						return storage_obj.val;
					}
				}
			} else {
				return null;
			}
		},
		set: function(name, val, ts) {
			if(!ts && ts!== 0) {
				localStorage.setItem(name, _.toJSONString({val: val, ts:-1}));
			} else {
				localStorage.setItem(name, _.toJSONString({val:val, ts:ts}));
			}
			return val;
		},
		clear: function(name) {
			if(!name) {
				localStorage.clear(); 
			} else {
				localStorage.removeItem(name);
			}
		},

	}
};