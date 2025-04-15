import { RiMailFill } from "react-icons/ri";
/* eslint-disable react/prop-types */
function Cell({ cellData }) {
    const renderedCells = () => {
        if (cellData === true || cellData === false) {
            return <td><button className="tableOptionButton" onClick={() => console.log(cellData)}><RiMailFill size={25}/></button></td>
        }  else {
            return <td>{cellData}</td>
        }
    }

    return (
        <>{renderedCells()}</>
    );
}

export default Cell;