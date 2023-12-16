import backgroundBlogImage from '../../assets/images/blog_page.jpg'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/blog.css'
import '../../assets/styles/blog_responsive.css'

const backgroundBlog = {
    backgroundImage: `url(${backgroundBlogImage})`
}

export const BlogMain = () => {
    return(<div className="home">
    <div
      className="background_image"
      style={backgroundBlog}
    />
    <div className="overlay" />
    <div className="home_container">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="home_content">
              <div className="home_title">Blog</div>
              <div className="home_subtitle">
                Pilates, Yoga, Fitness, Swimming &amp; more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}