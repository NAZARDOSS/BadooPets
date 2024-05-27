import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Filter from "./Filter";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

function Feed(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5296/api/DogsStorage")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("There was a problem fetching the products:", error);
      });
  }, []);

  return (
    <div className="feed">
      <div className="filter">
        <Filter />
      </div>

      <div className="posts">
        {products.map((product) => (
          <div key={product.id}>
            <PostCard
              name={product.name}
              age={product.age}
              image_url={product.image_url}
              description={product.description}
              price={product.price}
              type={product.type_}
              gender={product.gender}
            />
            <br />
          </div>
        ))}
      </div>

      <div className="searches">
        <h1>Saved Pets</h1>

        <Grid container wrap="nowrap" justifyContent="space-around">
          <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>

          <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>

        <Grid container wrap="nowrap" justifyContent="space-around">
          <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>

          <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
      </div>

      <span className="scroll-text">
        {" "}
        <b>Scroll me</b>
      </span>
    </div>
  );
}

export default Feed;
