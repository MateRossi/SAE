/* eslint-disable react/prop-types */
import Cell from "./Cell";

function Row({ item }) {
    return (
        <tr>
            {Object.entries(item).map(([key, value]) => {
                return (
                    <Cell key={key} cellData={value} />
                );
            })}
        </tr>
    )
}

export default Row;