import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/goselfworkplus", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Conectado ao MongoDB");
	} catch (err) {
		console.error("Falha ao conectar ao MongoDB:", err);
		process.exit(1);
	}
};
