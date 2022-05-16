import styled from "styled-components";

import { Color } from "../../utils";

interface Props {
  width: number;
  height: number;
}

export const BackgroundImage = styled.Image`
  width: ${(props: Props) => props.width}px;
  height: ${(props: Props) => props.height}px;
`;

export const TitleContainer = styled.View`
  padding: 15px 10px 25px 10px;
`;

export const PosterContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: -100px;
`;

export const Poster = styled.Image`
  border-width: 2px;
  border-radius: 6px;
  border-color: ${Color.White};
  background-color: ${Color.White};
  width: ${(props: Props) => props.width}px;
  height: ${(props: Props) => props.height}px;
`;

export const Title = styled.Text`
  font-size: 32px;
  padding-top: 15px;
  font-family: metropolis-bold;
`;

export const Tagline = styled.Text`
  font-size: 16px;
  padding-top: 5px;
  font-family: metropolis;
`;

export const Synopsis = styled.Text`
  padding: 0 10px;
`;
