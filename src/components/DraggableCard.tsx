import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DraggableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
  return (
    <Draggable draggableId={`${toDoId}`} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>🌟</span>
          <p>{toDoText}</p>
        </Card>
      )}
    </Draggable>
  );
};

const Card = styled.li<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  min-height: 40px;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#a5ccff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "2px 0px 5px rgba(0, 0, 0, 0.3)" : "none"};
  span {
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 200ms ease;
  }
  span:hover,
  span:active {
    font-size: 1.3rem;
    transform: scale(1.2);
  }
  p {
  }
`;

export default React.memo(DraggableCard);
