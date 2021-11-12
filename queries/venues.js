const {sql} = require("slonik")

const getVenueInfo = async (db, venue_name) => {
	try {
		const result = await db.query(sql`
				SELECT venue_name, venue_address, facilities
				FROM venues
				WHERE venue_name='${venue_name}'
         `);

		return result.rows;
	} catch (error) {
		console.info("⛔ Error at getVenueInfo query: ", error.message);
		return false;
	}
};

const getVenueByName = async (db, {search, venue_name}) => {
	try {
		const result = await db.query(sql`
				SELECT venue_name, venue_address, facilities
				FROM venues
				WHERE venue_name ILIKE '%${search}%' OR venue_name='${venue_name}'
         `);

		return result.rows;
	} catch (error) {
		console.info("⛔ Error at getVenueByName query: ", error.message);
		return false;
	}
};

module.exports = {
	getVenueInfo,
	getVenueByName,
};