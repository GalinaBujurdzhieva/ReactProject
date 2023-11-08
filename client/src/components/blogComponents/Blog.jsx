import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'

import { BlogMain } from './BlogMain'
import * as blogService from '../../services/blogService'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/blog.css'
import '../../assets/styles/blog_responsive.css'

import blogImage4 from '../../assets/images/blog_4.jpg'
import blogImage5 from '../../assets/images/blog_5.jpg'
import blogImage6 from '../../assets/images/blog_6.jpg'
import blogImage7 from '../../assets/images/blog_7.jpg'
import blogImage8 from '../../assets/images/blog_8.jpg'
import blogImage9 from '../../assets/images/blog_9.jpg'
import blogImage10 from '../../assets/images/blog_10.jpg'
import blogImage11 from '../../assets/images/blog_11.jpg'
import blogImage12 from '../../assets/images/blog_12.jpg'
import { BlogPost } from './BlogPost'



export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

useEffect(()=> {
  blogService.getAll()
  .then(blogs => setBlogs(blogs))
}, [])

console.log(blogs);

    return (
        <div className="super_container">
  {/* Blog  main part */}
  <BlogMain />
  {/* Blog */}
  <div className="blog_div">
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="section_title_container">
            <div className="section_subtitle">welcome to sportfit</div>
            <div className="section_title_blog">The Blog</div>
          </div>
        </div>
      </div>
      <div className="row blog_row">
         {blogs.map(blog => 
          <BlogPost 
          key= {blog._id}
          {...blog}
          />
          )} 
        {/* Blog Post */}
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage4} alt="" />
            </div>
            <div className="blog_post_title">
              Tips for the perfect body
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/*Blog Post 
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage5} alt="" />
            </div>
            <div className="blog_post_title">
              Tips for the perfect body
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/* Blog Post
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage6} alt="" />
            </div>
            <div className="blog_post_title">
              Pilates 4 Begginers
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/* Blog Post 
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage7} alt="" />
            </div>
            <div className="blog_post_title">
              Summer food
            </div>
            <div className="blog_post_date">
               june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/* Blog Post 
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage8} alt="" />
            </div>
            <div className="blog_post_title">
              Neck Exercise
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/* Blog Post 
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage9} alt="" />
            </div>
            <div className="blog_post_title">
             Weight lifting tips
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/* Blog Post 
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage10} alt="" />
            </div>
            <div className="blog_post_title">
              Yoga Classes
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/* Blog Post
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage11} alt="" />
            </div>
            <div className="blog_post_title">
              Tips for the perfect body
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        {/* Blog Post 
        <div className="col-xl-4 col-md-6 blog_col">
          <div className="blog_post">
            <div className="blog_post_image">
              <img src={blogImage12} alt="" />
            </div>
            <div className="blog_post_title">
              Pilates 4 Begginers
            </div>
            <div className="blog_post_date">
              june 29, 2018
            </div>
            <div className="blog_post_text">
              <p>
                Etiam nec odio vestibulum est mattis effic iturut magna.
                Pellentesque sit amet tellus blandit. Odio vestibulum est mattis
                effic iturut.
              </p>
            </div>
            <div className="blog_post_link">
              <a href="#">Read More</a>
            </div>
          </div>
        </div> */}
      </div>
      <div className="row">
        <div className="col">
          <div className="button blog_button ml-auto mr-auto">
            <Link to="/blog/all">Load More</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
}