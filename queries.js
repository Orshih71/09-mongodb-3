let db;
db.restaurants = undefined;
db.zips = undefined;
db.zips.aggregate = function () {

}
//1
db.zips.aggregate([
	{$match: {state: "IA"}},
	{
		$group: {
			_id: "$state",
			"zipcodes": {"$addToSet": "$_id"}
		}
	}
]);
//2
db.zips.aggregate([
	{$match: {pop: {$lt: 10000}}},
	{$project: {pop: 1}}
]);
//3
db.zips.aggregate([
	{
		$group: {
			_id: {"state": "$state", "city": "$city"},
			"zipcodes": {"$sum": 1}
		}
	},
	{$match: {"zipcodes": {$gt: 1}}},
	{$sort: {"_id.state": 1, "_id.city": 1}}
]);
//4
db.zips.aggregate([
	{
		$group: {
			_id: {"state": "$state", "city": "$city"},
			"pops": {"$sum": "$pop"}
		}
	},
	{$sort: {"pops": 1}},
	{
		$group: {
			_id: {"state": "$_id.state", "city": "$_id.city"},
			"min": {$min: "$pops"}
		}
	}
]);