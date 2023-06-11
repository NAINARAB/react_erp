import { Slide, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
const TblRow = (props) => {
    const { count } = props
    const { rowdat } = props;
    const { column } = props;
    const { upk } = props;
    const { dpk } = props;
    const {delog} = props;

    return (
        <>
            <TableRow>
                <TableCell sx={{ fontFamily: 'prosans' }}>{count}</TableCell>
                {column.map((item,index) => (
                    Object.entries(rowdat).map(([key,value]) => (
                        key == item ? <TableCell sx={{ fontFamily: 'prosans' }}>{value}</TableCell> : null
                    ))
                ))}
                <TableCell align="right" sx={{ fontFamily: 'prosans' }}>
                    <IconButton aria-label="expand row" size="small"
                        onClick={() => { 
                            // upk(rowdat.pk);  
                        }}
                    ><EditIcon /></IconButton>

                    <IconButton aria-label="expand row" size="small"
                        onClick={() => { 
                            // dpk(rowdat.pk);delog(true); 
                        }}
                        sx={{ color: 'rgba(255, 0, 0, 0.755)' }}><DeleteIcon /></IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}

const Tbl = (props) => {
    const { tableheaddata } = props;
    const { tablebodydata } = props;
    const { tablebodycolumn } = props;
    const { dpk } = props;
    const { upk } = props;
    const {delog} = props;
    let count = 0;
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableheaddata.map(obj => (
                                <TableCell
                                    variant={obj.variant}
                                    align={obj.align}
                                    width={obj.width}
                                    sx={{ backgroundColor: 'rgb(15, 11, 42)', color: 'white', fontFamily: 'prosans' }}
                                >
                                    {obj.headname}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tablebodydata.map(obj => (
                            <TblRow
                                count={++count}
                                rowdat={obj}
                                column={tablebodycolumn}
                                upk={upk}
                                dpk={dpk}
                                delog={delog} 
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Tbl;