const DateChanger = ({
  className,
  value,
  valueClickHandler,
  previousButtonClickHandler,
  nextButtonClickHandler,
  appearence,
}) => {
  const classNames = ["flex bg-slate-50 shadow-sm border border-slate-300"];
  if (appearence && appearence === "full") {
    classNames.push("justify-evenly border-r-0 border-l-0");
  } else {
    classNames.push("rounded-md");
  }

  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(" ")}>
      <button
        className="py-2 px-3 border-r border-slate-300 cursor-pointer"
        onClick={previousButtonClickHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
          className="w-2 fill-slate-400"
        >
          <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
        </svg>
      </button>
      <div className="py-2 px-3 cursor-pointer" onClick={valueClickHandler}>
        {value}
      </div>
      <button
        className="py-2 px-3 border-l border-slate-300 cursor-pointer"
        onClick={nextButtonClickHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
          className="w-2 fill-slate-400"
        >
          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
        </svg>
      </button>
    </div>
  );
};

export default DateChanger;
