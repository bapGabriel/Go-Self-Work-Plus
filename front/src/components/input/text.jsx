export default function InputText({
	label,
	name,
	register,
	type = "text",
	placeholder,
	className = "",
	error,
}) {
	return (
		<div className="mb-3">
			{label && (
				<label
					htmlFor={name}
					className="block mb-1 text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			)}
			<input
				id={name}
				{...register(name)}
				type={type}
				placeholder={placeholder}
				className={`border p-2 w-full rounded ${className}`}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
}
