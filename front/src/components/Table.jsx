/* eslint-disable react/prop-types */
import Row from "./Row";

function Table({ items, columnLabels }) {
    return (
        <table>
            <thead>
                <tr>
                    {columnLabels.map(label => (
                        <th key={label}>{label}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {items.map(item => (
                    <Row key={item.email} item={item} />
                ))}
            </tbody>
        </table>
    )
}

export default Table;