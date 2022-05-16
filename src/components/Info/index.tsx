import React from "react";

import { Title, Content } from "./styles";
import { Props } from "./types";

const Info = ({ title, content }: Props) => {
  return (
    <Title>
      {`${title}: `}
      <Content>{content}</Content>
    </Title>
  );
};

export default Info;
