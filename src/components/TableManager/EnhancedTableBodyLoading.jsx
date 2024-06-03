import { TableBody, TableRow, TableCell, LinearProgress } from "@mui/material";

export const EnhancedTableBodyLoading = () => {
    return (
        <TableBody>
            <TableRow
                style={{
                    height: 40,
                }}
                >
                <TableCell colSpan={100}>
                    <LinearProgress />
                </TableCell>
            </TableRow>
        </TableBody>
    )
}