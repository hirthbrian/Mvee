import styled from "styled-components";
import { Color } from "../../../../utils";

interface Props {
  width: number;
  height: number;
}

export const Container = styled.Pressable`
  flex-direction: row;
  border-radius: 25px;
  background-color: ${Color.Grey};
  width: ${(props: Props) => props.width}px;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TitleContainer = styled.View`
  flex: 1;
  padding: 0 15px;
  justify-content: center;
`;

export const Title = styled.Text`
`;

export const Subtitle = styled.Text`
  font-size: 12px;
`;
