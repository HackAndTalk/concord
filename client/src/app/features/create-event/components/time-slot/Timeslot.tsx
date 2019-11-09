import * as React from 'react';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import { Typography, TableCell, styled } from '@material-ui/core';
import ContainedIconButton from '../../../../components/ContainedIconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

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

interface IProps {
    start: Date;
    end: Date;
    onEdit: () => void;
    onDelete: () => void;
}

const Timeslot: React.FC<IProps & TableRowProps> = ({
    start,
    end,
    onEdit,
    onDelete,
    ...rowProps
}) => {

    return (
        <TableRow {...rowProps}>
            <NameCell>
                <Typography variant='body1'>
                    {moment(start).format('LT')} - {moment(end).format('LT')}
                </Typography>
            </NameCell>
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

export default Timeslot;