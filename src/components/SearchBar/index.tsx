import React from "react";

import { Container, SubContainer, TextInput } from "./styles";
import { Props } from "./types";

const SearchBar = () => {
  return (
    <Container>
      <SubContainer>
        <TextInput placeholder="Search..." />
      </SubContainer>
    </Container>
  );
};

export default SearchBar;
