import styled from "styled-components";

interface Props {
  width: number;
  height: number;
}

export const Container = styled.Pressable`
  background-color: #f0f0f0;
  width: ${(props: Props) => props.width}px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Poster = styled.Image`
  width: ${(props: Props) => props.width}px;
  height: ${(props: Props) => props.height}px;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  padding: 5px 5px 0 5px;
`;

export const SubTitle = styled.Text`
  font-size: 10px;
  padding: 2px 5px 5px 5px;
`;
