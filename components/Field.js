const Field = ({
  label,
  type,
  placeholder,
  className,
  value,
  changeHandler,
}) => {
  return (
    <div className={className}>
      {label && <label className="mb-1 block text-sm">{label}:</label>}
      <div>
        <input
          type={type || "text"}
          className="py-2 pr-2 border-b border-[rgba(0,0,0,0.2)] w-full outline-none"
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default Field;
