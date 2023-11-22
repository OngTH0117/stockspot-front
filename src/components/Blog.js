import React, { useEffect, useState } from 'react';
import Header from './UI/Header';
import Footer from './UI/Footer';
import axios from 'axios';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
    const publishedUtcTime = new Date(publishedTime);
  
    const timeDifferenceInSeconds = Math.floor(
      (currentTime - publishedUtcTime) / 1000
    );
  
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${
        timeDifferenceInSeconds !== 1 ? "s" : ""
      } ago`;
    }
  
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  
    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minute${
        timeDifferenceInMinutes !== 1 ? "s" : ""
      } ago`;
    }
  
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  
    if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hour${
        timeDifferenceInHours !== 1 ? "s" : ""
      } ago`;
    }
  
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    return `${timeDifferenceInDays} day${
      timeDifferenceInDays !== 1 ? "s" : ""
    } ago`;
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogPosts = blogPosts.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ marginTop: '100px' }}>
        <div className="container my-4" style={{ maxWidth: '1500px', marginTop: '120px' }}>
          <h1 className="mb-4">Blog Posts</h1>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filteredBlogPosts.map((blog, index) => (
              <div className="col" key={`${blog.created_at}_${index}`} style={{ flexBasis: '25%' }}>
                <div className="card h-100">
                  <img
                    src={`http://127.0.0.1:8000/storage/${blog.image}`}
                    alt="Blog Post"
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <a
                      href={"/blogDetail/" + blog.id}
                      style={{ textDecoration: 'none' }}
                    >
                      <h5 className="card-title mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 3, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}>
                        {blog.title}
                      </h5>
                    </a>
                    <p className="card-text"> Posted by: {blog.user.name}</p>
                    <p className="card-text">{getTimeDifference(blog.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;