import React from "react";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import MarketOverview from "./UI/MarketOverview";
import DashNews from "./UI/DashGlobalNews";
import Ticker from "./UI/Ticker";
import BlogPost from "./UI/BlogPost";
import MarketWidget from "./UI/MarketWidget";

function Home() {
  return (
    <div>
      <Header />

      <div style={{ paddingTop: "50px" }}>
        

        <div style={{ float: "left", width: "55%" }}>
          <h1 style={{ marginLeft: "50px" }}>Dashboard</h1>
          <DashNews />
        </div>

        <div
          style={{
            float: "right",
            width: "45%",
            paddingTop: "45px",
            paddingRight: "30px",
          }}
        >
          <BlogPost />
        </div>

        <div style={{ clear: "both" }}></div>
      </div>
      
      <div style={{ float: "left", width: "55%" ,padding: "30px"}}>
      <MarketOverview />
      </div>
      
      <div style={{ float: "right", width: "45%", marginLeft: "50px" }}>
        <MarketWidget />
      </div>
      <div style={{ clear: "both" }}></div>
      <Footer />
    </div>
  );
}

export default Home;