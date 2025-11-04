import React from "react";

function InputSelect({ label, name, register, options, error }) {
	return (
		<div className="flex flex-col">
			<label htmlFor={name} className="font-medium mb-1 text-sm text-gray-700">
				{label}
			</label>
			<select
				id={name}
				{...register(name)}
				className="border p-2 rounded w-full bg-white"
				defaultValue=""
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
}

export default InputSelect;
