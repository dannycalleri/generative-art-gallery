import React from 'react';
import styled from 'styled-components';
import Sinusoidal from './sinusoidal';
import Abstract from './abstract';
import AbstractTwo from './abstract-two';
import StarWars from './star-wars';
import './App.css';

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 50px;
`;

const FramesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

function App() {
  return (
    <Container>
      <FramesContainer>
        <h1>Generative art gallery</h1>
        <StarWars />
        <AbstractTwo />
        <Abstract />
        <Sinusoidal />
      </FramesContainer>
    </Container>
  );
}

export default App;
