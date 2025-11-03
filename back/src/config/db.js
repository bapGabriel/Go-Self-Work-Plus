import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Conectado ao MongoDB");
	} catch (err) {
		console.error("Falha ao conectar ao MongoDB:", err);
		process.exit(1);
	}
};
