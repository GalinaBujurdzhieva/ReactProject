import {Link} from 'react-router-dom'

export const HomeBlogMain = () =>{
    return(
        <div className="row">
        <div className="col">
          <div className=" d-flex flex-row align-items-start justify-content-start">
            <div className="section_title_container">
              <div className="section_title">The Blog</div>
            </div>
            <div className="all_posts_link ml-auto">
              <Link to="/blog/all">View all blog posts</Link>
            </div>
          </div>
        </div>
      </div>
    )
}