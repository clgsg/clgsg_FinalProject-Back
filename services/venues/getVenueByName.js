// const { getVenueByName } = require("../../queries/venues");

// module.exports = (db) => async (req, res) => {

// 	const { venue_name } = req.query;
// 	const [result] = await getVenueByName(db, { venue_name });

// 	res.status(200).json({
// 		success: true,
// 		data: {
// 			venue_name: result.venue_name,
// 			venue_address: result.venue_address,
// 			facilities: result.facilities,
// 		},
// 	});
// };
