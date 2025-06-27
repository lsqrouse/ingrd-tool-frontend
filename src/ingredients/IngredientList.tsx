import { Ingredient } from "../types"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type IngredientListProps = {
    ingredients: Ingredient[];
    updateDataFunc: () => void;
};

function IngredientList ({ingredients, updateDataFunc}: IngredientListProps) {
    return (
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Expiration Date</TableCell>
            <TableCell align="right">Quantity)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow
              key={ingredient.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ingredient.ingredientDef.ingredientName}
              </TableCell>
              <TableCell align="right">{ingredient.expirationDate}</TableCell>
              <TableCell align="right">{ingredient.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        )
}

export default IngredientList;