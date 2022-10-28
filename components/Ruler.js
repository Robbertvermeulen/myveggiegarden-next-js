const Ruler = ({ type, sizeInPixels, actualSize }) => {
  let styleProperty = "width";
  if (type === "vertical") styleProperty = "height";

  const renderRulerItems = () => {
    const elements = [];
    const elementSize = sizeInPixels / actualSize;
    for (let i = 1; i <= actualSize; i++) {
      let number = i / 2;
      number = !!(number % 1) ? "" : number;
      elements.push(
        <div
          key={i}
          className="garden-ruler-item"
          style={{ [styleProperty]: elementSize + "px" }}
        >
          <span className="garden-ruler-item-number">{number}</span>
        </div>
      );
    }
    return elements;
  };

  return (
    <div class={`garden-ruler garden-ruler-${type}`}>{renderRulerItems()}</div>
  );
};

export default Ruler;
