const Dropdown = ({ label, className, options, value, changeHandler }) => {
  return (
    <div className={className}>
      {label && <label className="mb-1 block text-sm">{label}:</label>}
      <select
        className="py-2 pr-2 border-b border-[rgba(0,0,0,0.2)] w-full outline-none"
        value={value}
        onChange={changeHandler}
      >
        {options?.map((option, index) => (
          <option value={option.value} key={index}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
