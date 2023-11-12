import { BlogPost } from "./BlogPost";

export const BlogAll = ({blogs})=>{
    return(
        <div className="row blog_row">
         {Object.values(blogs).map(blog => 
          <BlogPost 
          key= {blog._id}
          {...blog}
          />
          )} 
      </div>
    );

}