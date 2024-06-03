import { TableBody, TableRow, TableCell } from "@mui/material";
import { BlockVacio } from '../BlockVacio/BlockVacio';

export const EnhancedTableBodyEmpty = ({ height = 300})=> {
    return (
        <TableBody>
            <TableRow
                style={{
                    height: height - 100,
                }}
                >
                <TableCell colSpan={100}>
                    <BlockVacio />
                </TableCell>
            </TableRow>
        </TableBody>
    )
}