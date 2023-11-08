import {Link} from 'react-router-dom'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/blog.css'
import '../../assets/styles/blog_responsive.css'

import blogImage4 from '../../assets/images/blog_4.jpg'

export const BlogPost = ({
    ...blog
}) => {
    return(
    <div className="col-xl-4 col-md-6 blog_col">
    <div className="blog_post">
      <div className="blog_post_image">
        <img src={blog.imageUrl} alt="" />
      </div>
      <div className="blog_post_title">
         {blog.title}
      </div>
      <div className="blog_post_date">
        {blog.createdAt}
      </div>
      <div className="blog_post_text">
        <p>
          {blog.text}
        </p>
      </div>
      <div className="blog_post_link">
        <Link to="#">Read More</Link>
      </div>
    </div>
  </div>)
}