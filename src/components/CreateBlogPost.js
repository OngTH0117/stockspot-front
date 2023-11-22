import React, { useState } from "react";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import "./CreateBlogPost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlogPost() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false); // state to control modal visibility
  const closeModal = () => {
    setShowModal(false);
  };
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    picture: null,
    picturePreview: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      picture: file,
      picturePreview: URL.createObjectURL(file), // preview URL for the selected image
    });
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      picture: null,
      picturePreview: null,
    });
    // reset the file input to clear the selected file
    document.getElementById("picture").value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // prepare the data to be sent in the request body
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("image", formData.picture);
    const token = localStorage.getItem("token");
    try {
      // send POST request to backend
      const response = await axios.post(
        "http://127.0.0.1:8000/api/blogPost",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending file data
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Token:", localStorage.getItem("userToken"));

      console.log("Blog post created successfully:", response.data);

      console.log("Request Body:", postData);
      console.log("Request Headers:", {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      // reset the form after successful submission
      setFormData({
        title: "",
        content: "",
        picture: null,
        picturePreview: null,
      });

      setSuccessMessage(response.data.message);
      setError(null);
      setShowModal(true);

      setTimeout(() => {
        navigate("/UserProfile"); //redirect to user profile after sucess
      }, 2000);
    } catch (error) {
      console.error("Error creating blog post:", error.message);
      setError(error.message);
      setSuccessMessage(null);
      setShowModal(true);
    }
  };

  return (
    <div>
      <Header />
      {showModal && (
         <div
         className={`modal ${showModal ? "fade-in" : ""}`}
         style={{ display: "block", marginTop: "40px" }}
       >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {successMessage ? "Success" : "Error"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
              </div>
             
            </div>
          </div>
        </div>
      )}

      <div className="container" style={{ marginTop: "100px" }}>
        <div className="blog-form-card">
          <h2>Create Blog Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="picture">Picture:</label>
              <input
                type="file"
                id="picture"
                name="picture"
                onChange={handleFileChange}
                required
              />
              {formData.picturePreview && (
                <div className="image-preview-container">
                  <img
                    src={formData.picturePreview}
                    alt="Selected Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="center">
              <button type="submit" className="submit-button">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateBlogPost;
