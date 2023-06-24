import React from 'react';
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
} from '../components/Styles';
import NavbarHead  from '../components/NavbarHead';
import FooterBottom  from '../components/FooterBottom';
import BookCards from '../components/bookcards';
import Signup from './Signup';
import Login from './Login';

function Home(props){
  return (
    <div>
      
      <NavbarHead />
      <PageContainer>
        <ContentContainer>
          <HeadTitle style={{marginTop: '130px'}}>LIBRARY APPLICATION</HeadTitle>
          {/* <h2>{props.email ? `Welcome - ${props.email}` : "Login please"}</h2> */}
          <BookCards/>
        </ContentContainer>
      {/* <FooterBottom /> */}
      </PageContainer>
    </div>
  );
};

export default Home;
