import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../data/atom";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };

  return (
    <BoardArea>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          {...register("toDo", { required: true })}
          placeholder={`Add task ${boardId}`}
        />
        <button>click me</button>
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <List
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </BoardArea>
  );
};

interface IBoardAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 3px;
  padding-top: 15px;
`;

const Form = styled.form`
  padding: 0 10px;
  input {
    width: 100%;
    height: 30px;
    margin-bottom: 5px;
    padding: 4px;
    &:focus {
      outline: none;
      border: 1px solid #ffd83b;
    }
  }
  button {
    width: 100%;
    height: 25px;
    border: 1px solid #a2a2a2;
    background-color: #ffd83b;
    border-radius: 3px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

const List = styled.ul<IBoardAreaProps>`
  flex-grow: 1;
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  transition: background-color 0.3s ease;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ffcbcb"
      : props.isDraggingFromThis
      ? "#fff6cb"
      : props.theme.boardColor};
`;

export default Board;
