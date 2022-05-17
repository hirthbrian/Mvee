import styled from "styled-components";
import Animated from "react-native-reanimated";

import { Color } from "../../../utils";

export const Container = styled.View`
  height: 30px;
  overflow: hidden;
  border-radius: 4px;
  flex-direction: row;
  margin: 2px 0 2px 10px;
  background-color: ${Color.Grey};
`;

export const ProgressBar = styled(Animated.View)`
  padding: 0 5px;
  align-items: flex-end;
  justify-content: center;
  background-color: ${Color.Red};
  flex: ${(props) => props.percentage};
`;

export const ScoreText = styled(Animated.Text)`
  padding-left: 5px;
  align-self: center;
  font-family: metropolis-bold;
  color: ${(props) => props.color};
`;

export const Logo = styled.Image`
  top: 5px;
  left: 5px;
  width: 40px;
  height: 20px;
  position: absolute;
`;
