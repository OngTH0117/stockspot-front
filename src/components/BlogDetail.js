import Header from './UI/Header'
import Footer from './UI/Footer'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Blogdetail.css'
import { Modal } from 'react-bootstrap';


function BlogDetail() {
  const { blogId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blogDetail/${blogId}`);
        if (response.data && response.data.blogPost) {
          setBlogPost(response.data.blogPost);
        } else {
          console.error("Blog post not found");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [blogId]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };
  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  return (
    <div >
      <Header />
        <div style={{ marginTop: "100px" , marginBottom:"50px"}}>

       
      <div className="blog-detail-container container mt-5" >
  <div className="row">
    <div className="col-md-10 offset-md-1">
            <h2 className="blog-title" style={{ marginBottom: "30px" }}>{blogPost.title}</h2>
            <img
              src={`http://127.0.0.1:8000/storage/${blogPost.image}`}
              alt="Blog Post"
              className="img-fluid"
              style={{
                width: "100%", 
                maxHeight: "500px", 
                objectFit: "cover", 
                marginBottom: "20px"
              }}
            />
            <div className="blog-info">
            <p className="blog-date">
  Posted by:{" "}
  <span
    className="user-link"
    onClick={() => handleUserClick(blogPost.user)}
    style={{ cursor: "pointer" }}
  >
    {blogPost.user.name}
  </span>
  <br />
  {new Date(blogPost.created_at).toLocaleString()}
</p>
              <div className="blog-content">
                {blogPost.content}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
      <Footer />

      <Modal show={showUserModal} onHide={handleCloseUserModal} style={{ marginTop: "100px"}}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>Name: {selectedUser.name}</p>
              <p>Email : {selectedUser.email}</p>
              <p>Contact: {selectedUser.contactNumber}</p>
              <p>Description: {selectedUser.description}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default BlogDetail;