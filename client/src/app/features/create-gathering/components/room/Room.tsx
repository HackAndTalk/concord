import * as React from 'react';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import { Typography, TableCell, Chip, styled } from '@material-ui/core';
import ContainedIconButton from '../../../../components/ContainedIconButton';


import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
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
    onEdit: () => void;
    onDelete: () => void;
}

const Room: React.FC<IProps & TableRowProps> = ({
    name,
    capacity,
    onEdit,
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
                <ContainedIconButton size='small'>
                    <EditIcon />
                </ContainedIconButton>
                <ContainedIconButton size='small'>
                    <DeleteIcon />
                </ContainedIconButton>
            </ActionsCell>
        </TableRow>
    )
}

export default Room;