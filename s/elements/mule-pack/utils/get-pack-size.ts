export function getPackSize(size: string | undefined) {
	const columns = Number(size?.split("x")[0])
	const rows = Number(size?.split("x")[1])
	return {columns, rows}
}
