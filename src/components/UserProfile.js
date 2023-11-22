import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./UI/Footer";
import Header from "./UI/Header";
import { Modal, Button, Tab, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditProfile from "./UI/EditProfile";
import "./UserProfile.css";
import Watchlist from "./Watchlist";

const UserProfile = () => {
  const userProfileData = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("watchlist");
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [showWatchlistStockModal, setShowWatchlistStockModal] = useState(false);
  const [selectedWatchlistStock, setSelectedWatchlistStock] = useState(null);

  const getUserWatchlist = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/userWatchlist/${userProfileData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserWatchlist(response.data);
    } catch (error) {
      console.log("Error fetching user watchlist:", error);
    }
  };

  useEffect(() => {
    getUserWatchlist();
  }, []);
  const buttonStyles = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfileClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const [selectedPost, setSelectedPost] = useState(null);

  const handleDeleteConfirmation = (postId) => {
    setSelectedPost(postId);
  };
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/dashBlog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // filter blog posts based on userid
      const userBlogPosts = response.data.blogPosts.filter(
        (post) => post.user_id === userProfileData.id
      );
      setBlogPosts(userBlogPosts);
    } catch (error) {
      console.log("Error fetching blog posts:", error);
    }
  };
  const handleDeleteBlogPost = async (postId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/deleteBlogPost/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // after successful deletion, refresh the list of blog posts
      fetchBlogPosts();
    } catch (error) {
      console.log("Error deleting blog post:", error);
    }
  };

  const removeFromWatchlist = async (watchlistId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/removeFromWatchlist/${watchlistId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getUserWatchlist(); // Refresh the watchlist after removal
    } catch (error) {
      console.log("Error removing from watchlist:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleOpenWatchlistStockModal = (stock) => {
    setSelectedWatchlistStock(stock);
    setShowWatchlistStockModal(true);

    // fetch stock data when modal is opened
    fetchStockByIdentifier(stock.stock_identifier);
  };
  const fetchStockByIdentifier = async (identifier) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/stock/${identifier}`
      );
      const stockData = response.data.data; // Access second set of data

      // Clean the keys of the stockData object
      const cleanedStockData = {};
      Object.keys(stockData).forEach((key) => {
        const cleanedKey = key.trim(); 
        cleanedStockData[cleanedKey] = stockData[key];
      });

      setSelectedWatchlistStock(cleanedStockData); // Update selectedStock with cleaned data
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  return (
    <div>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <div className="container my-5">
          <div className="row">
            {userProfileData && (
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <img
                      src="https://icon-library.com/images/profile-picture-icon/profile-picture-icon-7.jpg"
                      alt="User Profile Picture"
                      className="rounded-circle img-fluid mb-3"
                      style={{ height: "200px" }}
                    />
                    <h4 className="card-title">{userProfileData.name}</h4>
                    <ul className="list-group list-group-flush text-start">
                      <li className="list-group-item">
                        <strong>Contact&nbsp;&nbsp;:</strong>
                        <span>{userProfileData.contactNumber}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>
                          Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        </strong>
                        <span>{userProfileData.email}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Address&nbsp;&nbsp;:</strong>
                        <span>{userProfileData.address}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Description&nbsp;&nbsp;:</strong>
                        <span>{userProfileData.description}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-8">
              <Tab.Container activeKey={activeTab}>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="watchlist"
                      onClick={() => handleTabClick("watchlist")}
                    >
                      Watchlist
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="blogposts"
                      onClick={() => handleTabClick("blogposts")}
                    >
                      Blog Posts
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="editprofile"
                      onClick={() => handleEditProfileClick()}
                    >
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="watchlist">
                    <h2>Watchlist</h2>
                    {userWatchlist.length > 0 ? (
                      <ul className="watchlist">
                        {userWatchlist.map((watchlistItem) => (
                          <li
                            key={watchlistItem.id}
                            className="watchlist-item"
                            onClick={() =>
                              handleOpenWatchlistStockModal(watchlistItem)
                            } // Open modal on click
                            style={{ cursor: "pointer" }}
                          >
                            <span>{watchlistItem.stock_identifier}</span>
                            <button
                              className="remove-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromWatchlist(watchlistItem.id);
                              }}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No stocks in watchlist.</p>
                    )}
                  </Tab.Pane>
                  {showWatchlistStockModal && (
                    <Watchlist
                      stock={selectedWatchlistStock}
                      onClose={() => setShowWatchlistStockModal(false)}
                    />
                  )}
                  <Tab.Pane eventKey="blogposts">
                    <Nav.Item>
                      <div style={{ display: "flex" }}>
                        <button
                          style={buttonStyles}
                          onClick={() => navigate("/createBlogPost")}
                        >
                          Create Blog Post
                        </button>
                      </div>
                    </Nav.Item>
                    {blogPosts.map((post) => (
                      <div key={post.id}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "20px",
                          }}
                        >
                          <h3 style={{ fontSize: "18px" }}>
                            <a
                              href={"/blogDetail/" + post.id}
                              className="text-decoration-none"
                              style={{ color: "black" }}
                            >
                              {post.title}
                            </a>
                          </h3>
                          {post.user_id === userProfileData.id && (
                            <>
                              <button
                                style={{
                                  padding: "5px 10px",
                                  backgroundColor: "red",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                }}
                                onClick={() => setSelectedPost(post.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                        <hr />
                      </div>
                    ))}
                  </Tab.Pane>
                  <Tab.Pane eventKey="editprofile"></Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        style={{ marginTop: "60px" }}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile
            userProfileData={userProfileData}
            onClose={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={selectedPost !== null}
        onHide={() => setSelectedPost(null)}
        style={{ marginTop: "60px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this blog post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedPost(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteBlogPost(selectedPost);
              setSelectedPost(null);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default UserProfile;
