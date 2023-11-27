import '../../../../assets/styles/services.css'

export const WeightLossCourseDiv = ({ isVisible }) => {

  return isVisible 
  ? (
    <div className={"tt_class grid-item weight_loss"}>
      <div className="tt_class_title">Weight Loss</div>
      <div className="tt_class_instructor">Jessica Smith</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
