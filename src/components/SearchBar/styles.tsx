import styled from "styled-components";

import { Color } from "../../utils";

export const Container = styled.View`
  padding: 10px;
  background-color: ${Color.White};
`;

export const SubContainer = styled.View`
  padding: 12px 15px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${Color.Grey};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  padding: 0 10px;
`;
