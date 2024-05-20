/* eslint-disable react/prop-types */
function RadioGroup({ name, items, value, onChange }) {    
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === 'true' || value === 'false') {
            onChange(value === 'true');
        } else {
            onChange(value);
        }
    };

    return (<>
        {items.map(item => (
            <div key={item.value} className="radio-line">
                <input
                    name={name}
                    type="radio"
                    value={item.value}
                    id={name + item.value}
                    checked={value === item.value}
                    onChange={handleChange}
                /> <label htmlFor={name + item.value}>{item.label}</label>
            </div>
        ))}
    </>);
}

export default RadioGroup;