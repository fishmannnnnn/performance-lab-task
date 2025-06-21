export function showStoreSortValue(sortBy: string, sortOrder: "asc" | "desc") {
	let by = String(sortBy).charAt(0).toUpperCase() + String(sortBy).slice(1);
	if (sortBy === "title") by = "name";

	return `${by} (${sortOrder})`;
}
