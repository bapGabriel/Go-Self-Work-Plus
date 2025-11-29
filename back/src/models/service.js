import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	image: {
		type: String,
	},
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	// 🔥 NOVO CAMPO: trabalho finalizado
	completedWork: {
		description: { type: String, trim: true },
		photos: [{ type: String }], // lista de URLs
		postedAt: { type: Date }
	}
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
