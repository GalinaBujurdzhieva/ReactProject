import '../../../../assets/styles/services.css'

export const YogaCourseDiv = ({ isVisible }) => {
  return isVisible ? (
    <div className="tt_class grid-item yoga">
      <div className="tt_class_title">Yoga</div>
      <div className="tt_class_instructor">Jessica Smith</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
