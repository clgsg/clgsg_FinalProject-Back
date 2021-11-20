const { updateParticipants, getParticipants } = require("../../queries/participants");
const { checkIfUserIsInGame} = require("../../helpers/participantshelpers")


module.exports = (db) => async (req, res, next) => {
	if(checkIfUserIsInGame !== false){
		return next({
			error: new Error("Parece que ya te has apuntado a esta pachanga.")
		})
	}
	await updateParticipants(db, {userid, gameid});

	const result = getParticipants(db, {game_participants});

	if (result === false) {
		return next({
			statusCode: 404,
			error: new Error("No se han encontrado participantes"),
		});
		}
	// return result;}


	res.status(200).json({
		success: "true",
		data: result,
	});
};