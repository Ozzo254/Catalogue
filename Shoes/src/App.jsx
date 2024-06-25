import { useState } from "react";
import './index.css'

import NavBar from "./Layouts/NavBar/Nav";
import Products from "./Layouts/Products/Products";
import Recommended from "./Layouts/Recommended/Recommended";
import Sidebar from "./Layouts/Sidebar/Sidebar";

// Database
import products from "./assets/data";
import Cards from "./Components/Cards/Cards";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("")

  // --------input filter-----------

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter((product) => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()!== -1))

  // --------Radio filter-----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  // --------Buttons filter-----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering input Items
    if (query){
      filteredProducts = filteredItems;
    }

    // Selected filter
    if(selected){
      filteredProducts = filteredProducts.filter(({category, color, company, newPrice, title}) => category === selected || color === selected || company === selected || newPrice === selected || title === selected)
    }

    return filteredProducts.map(({img, title, star, reviews, prevPrice, newPrice}) => (
      <Cards 
      key={Math.random()}
      img={img}
      title={title}
      star={star}
      reviews={reviews}
      newPrice={newPrice}
      prevPrice={prevPrice}
      />
    ))
  }

  const output = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange}/>
      <NavBar query={query} handleInputChange={handleInputChange}/>
      <Recommended handleClick={handleClick}/>
      <Products output={output}/>
    </>
  )
}

export default App
