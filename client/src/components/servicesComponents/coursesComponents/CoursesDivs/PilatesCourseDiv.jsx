import '../../../../assets/styles/services.css'

export const PilatesCourseDiv = ({ isVisible }) => {
  return isVisible ? (
    <div className="tt_class grid-item pilates">
      <div className="tt_class_title">Pilates</div>
      <div className="tt_class_instructor">Jessica Smith</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
