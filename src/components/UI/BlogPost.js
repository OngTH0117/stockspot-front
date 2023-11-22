import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dashBlog");
        if (response.data && response.data.blogPosts) {
          
          const sortedBlogPosts = response.data.blogPosts.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          setBlogPosts(sortedBlogPosts);
        } else {
          console.error("Blog posts data is missing 'blogPosts' property:", response.data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  function getTimeDifference(publishedTime) {
    const currentTime = new Date();
    const publishedTimeUtc = new Date(publishedTime);
    const timeDifferenceInSeconds = Math.floor((currentTime - publishedTimeUtc) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds !== 1 ? "s" : ""} ago`;
    }

    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minute${timeDifferenceInMinutes !== 1 ? "s" : ""} ago`;
    }

    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);

    if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hour${timeDifferenceInHours !== 1 ? "s" : ""} ago`;
    }

    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    return `${timeDifferenceInDays} day${timeDifferenceInDays !== 1 ? "s" : ""} ago`;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "900px", display: "flex" }}>
      <div className="row d-flex align-items-center" style={{ display: "flex", flex: "1", flexDirection: "column" }}>
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Latest Blog Post</h4>
              <div className="table-responsive" style={{ maxHeight: "610px", overflowY: "auto" }}>
                <table className="table table-sm">
                  <tbody>
                    {blogPosts.slice(0, 10).map((blog) => (
                      <tr key={blog.id}>
                        <td style={{ width: "20%" }}>
                          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                            <img
                              src={`http://127.0.0.1:8000/storage/${blog.image}`}
                              alt="News"
                              className="img-fluid"
                              style={{ maxWidth: "100%", height: "auto", maxHeight: "100px" }}
                            />
                          </div>
                        </td>
                        <td style={{ border: "1px solid #dee2e6" }} className="align-middle">
                          <h6
                            className="title-text"
                            style={{
                              color: "black",
                              marginBottom: "0",
                              fontSize: "14px",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <a href={"/blogDetail/" + blog.id} className="text-decoration-none">
                              {blog.title}
                            </a>
                          </h6>
                          <p style={{ marginTop: "3px" }}>
                            Posted by: {blog.user.name} 
                            <br />
                            {getTimeDifference(blog.created_at)} 
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center">
                <a href="/blogPosts" className="text-decoration-none">
                  See More <span>&raquo;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;






