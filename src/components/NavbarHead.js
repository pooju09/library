import React, { useState } from 'react';
import axios from 'axios';
import ViewSearchResults from './ViewSearchResults';
import { useNavigate, Link} from 'react-router-dom';


import {
  GlobalStyle,
  Navbar,
  NavLinks,
  NavLink,
  NavItem,
  SearchBox,
  RightContainer,
  BrandLogo,
  LoginLink,
  Button
} from './Styles';


const NavbarHead = () => {
  
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {

      console.log(searchValue);
      // Make a request to the Google Books API
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: searchValue,
        },
      });
      
      // Handle the response data here
      console.log(response.data);
      setSearchResults(response.data);
      
      // Navigate to the SearchResults page with the search results
      navigate('/searchpage', { state: { searchResults: response.data } });

      // Reset the search term
      searchValue('');

    } catch (error) {
      // Handle any errors
      console.error(error);
    }


  };

  return (
    <div>
      <GlobalStyle />
      <Navbar>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/viewbooks">
        <Button>View Books</Button>
      </Link>
      {/* <Link to="/borrowbooks">
        <Button>Borrow</Button>
      </Link> */}
      <Link to="/login">
        <Button>Login</Button>
      </Link>
        
        {/* <NavLinks>
          
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/viewbooks">View Books</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/borrowbooks">Borrow Books</NavLink>
          </NavItem>
          <NavItem>
            <LoginLink href="/login">Login</LoginLink>
          </NavItem>
        </NavLinks> */}
        
        <RightContainer>
        </RightContainer>
        
        <RightContainer>

        <form onSubmit={handleSearch}>
        
        <SearchBox
              type="text"
              placeholder="Search for Books"
              id="searchInput" // Add a unique id attribute
              name="search" // Add a unique name attribute
              value={searchValue}
              onChange={handleSearchChange}
            />

        </form>

        </RightContainer>
        {/* <RightContainer style={{ marginLeft: '20px' }}>
          <BrandLogo src="logo.png" alt="Library Management System Logo" />
        </RightContainer> */}
      </Navbar>
      {searchResults && <ViewSearchResults searchResults={searchResults} />}

    </div>
  );
};

export default NavbarHead;
