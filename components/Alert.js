const Alert = ({ type, message }) => {
  let classNames = ["mb-2 p-3 rounded"];
  switch (type) {
    case "error":
      classNames.push("bg-red-50 text-red-600 border border-red-500");
    default:
  }
  return <div className={classNames.join(" ")}>{message}</div>;
};

export default Alert;
