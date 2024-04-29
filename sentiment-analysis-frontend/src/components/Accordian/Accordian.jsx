import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";

export default function AccordionTransition() {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend server
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch categories from the backend server
      const response = await fetch("http://localhost:5000/get-categories");
      const data = await response.json();
      setCategories(data); // Assuming data is an array of category objects
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (category) => {
    try {
      // Fetch products for the clicked category from the backend server
      const response = await fetch(
        `http://localhost:5000/products?category=${category}`
      );
      const data = await response.json();
      setProducts(data); // Assuming data is an array of product objects
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleExpansion = async (category) => {
    if (category === expanded) {
      // If the clicked category is already expanded, collapse it
      setExpanded(null);
    } else {
      // Otherwise, expand the clicked category and fetch its products
      setExpanded(category);
      await fetchProducts(category);
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      {categories.map((category) => (
        <Accordion
          key={category.CategoryName} // Assuming category objects have a unique key
          expanded={expanded === category.CategoryName}
          onChange={() => handleExpansion(category.CategoryName)}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={{
            "& .MuiAccordion-region": {
              height: expanded === category.CategoryName ? "auto" : 0,
            },
            "& .MuiAccordionDetails-root": {
              display: expanded === category.CategoryName ? "block" : "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${category.CategoryName}-content`}
            id={`panel-${category.CategoryName}-header`}
          >
            <Typography>{category.CategoryName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ducimus enim aspernatur dolorum saepe provident, vel deleniti numquam harum nemo sint ipsam consequuntur esse illum quas voluptatum dolore dolores placeat.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
