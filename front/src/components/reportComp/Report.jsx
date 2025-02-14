/* eslint-disable react/prop-types */
import './report.css';

function Report({ list, duplicatedLength }) {
    if (!list || list?.length === 0) {
        return;
    }

    const renderedAdded = list.map((item) => {
        return (
            <>
                <tr>
                    <td style={{ padding: '10px 16px' }}>{item.enrollment}</td>
                    <td style={{ padding: '10px 16px' }}>{item.name}</td>
                    <td style={{ padding: '10px 16px' }}>{item.email}</td>
                </tr>
            </>
        );
    });

    return (
        <div className="report-container">
            <div className='report-header'>
                <h3>{list.length} Egressos criados.</h3>
                <h3>{duplicatedLength || 0} Egressos já estavam cadastrados.</h3>
            </div>
            <hr className='separator' style={{ width: '100%' }}/>
            <table>
                <thead>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    {renderedAdded}
                </tbody>
            </table>
        </div>
    )
}

export default Report;