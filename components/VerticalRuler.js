import Ruler from "./Ruler";

const VerticalRuler = ({ sizeInPixels, actualSize }) => {
  return (
    <Ruler
      type="vertical"
      sizeInPixels={sizeInPixels}
      actualSize={actualSize}
    />
  );
};

export default VerticalRuler;
