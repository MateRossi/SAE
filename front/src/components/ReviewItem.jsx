/* eslint-disable react/prop-types */
function ReviewItem({ name, items, value, onChange }) {    
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue.length > 1) {
            onChange(name, selectedValue);
        } else {
            const finalValue = parseInt(selectedValue);
            onChange(name, finalValue);
        }
    };

    return (<div className="likert-scale-options">
        {items.map(item => (
            <div key={item.value} className="likert-scale">
                <input
                    name={name}
                    type="radio"
                    value={item.value}
                    id={name + item.value}
                    checked={value === item.value}
                    onChange={handleChange}
                /><label htmlFor={name + item.value}>{item.label}</label>
            </div>
        ))}
    </div>);
}

export default  ReviewItem;