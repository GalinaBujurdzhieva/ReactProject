import { useEffect, useState } from 'react'

import { BlogMain } from './BlogMain'
import * as blogService from '../../services/blogService'

import '../../assets/styles/bootstrap-4.1.2/bootstrap.min.css'
import '../../assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/styles/blog.css'
import '../../assets/styles/blog_responsive.css'

import { BlogPost } from './BlogPost'
import { BlogAll } from './BlogAll'

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAll, setShowAll] = useState(false);

useEffect(()=> {
  blogService.getAll()
  .then(blogs => setBlogs(blogs))
}, [])

const loadAllBlogsHandler = () => {
  setShowAll(true);
}

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
      {showAll 
      ? 
      <BlogAll blogs={blogs}/> 
      : 
      <div className="row blog_row">
      {Object.values(blogs).slice(-3).map(blog => 
       <BlogPost 
       key= {blog._id}
       {...blog}
       />
       )} 
   </div>}
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
          {showAll
          ?
            <button style={{ display: 'none' }} className="button blog_button">
            Load Less
          </button>
        : 
         
          <button onClick={() => loadAllBlogsHandler()} className="button blog_button">
          Load More
        </button>
        
        }
        </div>
      </div>
    </div>
  </div>
</div>
    );
}