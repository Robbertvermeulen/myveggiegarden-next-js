import Ruler from "./Ruler";

const HorizontalRuler = ({ sizeInPixels, actualSize }) => {
  return (
    <Ruler
      type="horizontal"
      sizeInPixels={sizeInPixels}
      actualSize={actualSize}
    />
  );
};

export default HorizontalRuler;
