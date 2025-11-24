import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
	{
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		suggestedValue: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["ABERTA", "EM_NEGOCIACAO", "CONCLUIDA", "CANCELADA"],
			default: "ABERTA",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Request", requestSchema);
