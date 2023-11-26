export const BlogLinkToAll = ({loadAllBlogsHandler}) =>{
    return(
        <div className="row">
            <div className="col d-flex align-items-center justify-content-center">
              <button
                onClick={() => loadAllBlogsHandler()}
                className="button blog_button"
              >
                Load More
              </button>
            </div>
          </div>
    )
}