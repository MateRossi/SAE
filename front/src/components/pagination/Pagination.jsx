import './Pagination.css';

/* eslint-disable react/prop-types */
export default function Pagination({ pagination, setPagination, listLength }) {
    // pagination === state é { page: 1, pageSize: 10 }
    const totalPages = Math.ceil(listLength / pagination.pageSize);

    const handlePageDown = () => {
        setPagination(prev => ({
            ...prev,
            page: prev.page > 1 ? prev.page - 1 : 1
        }));
    };

    const handlePageUp = () => {
        setPagination(prev => ({
            ...prev,
            page: prev.page < totalPages ? prev.page + 1 : totalPages
        }));
    };

    const handleInputChange = (event) => {
        const inputPage = parseInt(event.target.value, 10);

        if (isNaN(inputPage) || inputPage < 1 || inputPage > totalPages) {

            setPagination(prev => ({ ...prev, page: 1 }));
            console.log("Número de página inválido");
        } else {

            setPagination(prev => ({
                ...prev,
                page: inputPage
            }));
        }
    };

    return (
        <div className='pagination'>
            <button
                onClick={handlePageDown}
                disabled={pagination.page === 1}
            >
                {"<"}
            </button>
            <label>
                Página atual:
                <input
                    type="number"
                    value={pagination.page}
                    onChange={handleInputChange}
                    min="1"
                    max={totalPages}
                />
            </label>
            <button
                onClick={handlePageUp}
                disabled={pagination.page === totalPages}
            >
                {">"}
            </button>
        </div>
    );
}