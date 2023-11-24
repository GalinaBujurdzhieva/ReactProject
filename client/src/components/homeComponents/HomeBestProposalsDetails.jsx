import * as iconHelper from '../../utils/getBestSellerIconByKey'

export const HomeBestProposalsDetails = ({...bestProposal}) =>{
    return(
        <div className="box">
        <div className="box_icon d-flex flex-column align-items-center justify-content-center">
          <img src={iconHelper.getIcon(bestProposal.name)} alt={bestProposal.name} />
        </div>
        <div className="box_title">{bestProposal.name}</div>
        <div className="box_text">
          <p>
           {bestProposal.description}
          </p>
        </div>
      </div>
    )
}