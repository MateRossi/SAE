/* eslint-disable react/prop-types */
import Row from "./Row";

function EgresTable({ items, columnLabels }) {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columnLabels.map(label => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {items.map(item => (
                        <Row key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EgresTable;