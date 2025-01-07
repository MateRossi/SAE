/* eslint-disable react/prop-types */
import './FilterOptions.css';

export default function FilterOptions({ filter, setFilter }) {
    const handleCheckboxChange = (event, key) => {
        const isChecked = event.target.checked;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [key]: isChecked,
        }));
    };

    return (
        <div className="filter-container">
            <div className='checkbox-item'>
                <label>
                    <input
                        type="checkbox"
                        checked={filter?.confirmed}
                        onChange={(e) => handleCheckboxChange(e, "confirmed")}
                    />
                    Confirmados
                </label>
            </div>
            <div className='checkbox-item'>
                <label>
                    <input
                        type="checkbox"
                        checked={filter?.notConfirmed}
                        onChange={(e) => handleCheckboxChange(e, "notConfirmed")}
                    />
                    Não Confirmados
                </label>
            </div>
            <div className='checkbox-item'>
                <label>
                    <input
                        type="checkbox"
                        checked={filter?.outdated}
                        onChange={(e) => handleCheckboxChange(e, "outdated")}
                    />
                    Desatualizados (6 meses ou mais)
                </label>
            </div>
        </div>
    );
}