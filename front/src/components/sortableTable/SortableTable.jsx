/* eslint-disable react/prop-types */
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';
import useSort from "../hooks/use-sort";
import Table from './Table';

function SortableTable(props) {
    const { config, data } = props;
    const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config);

    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
            return column;
        }

        return {
            ...column,
            header: () => (
                <th onClick={() => setSortColumn(column.label)}>
                    <div className='column-label'>
                        {column.label}
                        {getIcons(column.label, sortBy, sortOrder)}
                    </div>
                </th>
            ),
        };
    });

    return <Table {...props} data={sortedData} config={updatedConfig} />;
}

function getIcons(label, sortBy, sortOrder) {
    if (label !== sortBy) {
        return <div className="icons">
            <FaCaretUp style={{marginBottom:'-10px'}}/>
            <FaCaretDown />
        </div>;
    }

    if (sortOrder === null) {
        return <div className="icons">
            <FaCaretUp style={{marginBottom:'-10px'}}/>
            <FaCaretDown />
        </div>;
    } else if (sortOrder === 'asc') {
        return <div className="icons">
            <FaCaretUp/>
        </div>;
    } else if (sortOrder === 'desc') {
        return <div className="icons">
            <FaCaretDown />
        </div>
    }
}

export default SortableTable;