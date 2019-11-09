import * as React from 'react';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import { Typography, TableCell, Chip, styled, IconButton } from '@material-ui/core';


import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';

const NameCell = styled(TableCell)({
    paddingLeft: 0
});

const ActionsCell = styled(TableCell)(({ theme }) => ({
    paddingRight: 0,
    textAlign: 'right',

    '&>:not(:first-child)': {
        marginLeft: theme.spacing(1)
    }
}));

const CapacityIndicator = styled(Chip)({
    backgroundColor: 'transparent'
})

interface IProps {
    name: string;
    capacity: number;
    onDelete: () => void;
}

const Room: React.FC<IProps & TableRowProps> = ({
    name,
    capacity,
    onDelete,
    ...rowProps
}) => {
    return (
        <TableRow>
            <NameCell>
                <Typography variant='body1'>
                    {name}
                </Typography>
            </NameCell>
            <TableCell>
                <CapacityIndicator
                    icon={<PersonIcon />}
                    label={capacity}
                    size='small'
                />
            </TableCell>
            <ActionsCell>
                <IconButton
                    size='small'
                    onClick={onDelete}
                >
                    <DeleteIcon />
                </IconButton>
            </ActionsCell>
        </TableRow>
    )
}

export default Room;