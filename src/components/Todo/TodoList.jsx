import React from "react";
import styled from "styled-components";

const TodoList = ({ selectedDate, tasks }) => {
  const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환

  const filteredTasks = tasks.filter(task => task.date === formattedDate);

  return (
    <ListContainer>
      {filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
          <TaskItem key={task.task_id}>
            <TaskName>{task.task_name}</TaskName>
            {/* <TaskDescription>{task.task_description}</TaskDescription>
            <TaskTime>예상 시간: {task.predict_time}분</TaskTime> */}
          </TaskItem>
        ))
      ) : (
        <NoTaskMessage>할 일이 없습니다.</NoTaskMessage>
      )}
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  padding: 10px;
`;

const TaskItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const TaskName = styled.h3`
  margin: 0;
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
  color: #666;
`;

const TaskTime = styled.p`
  margin: 0;
  color: #999;
`;

const NoTaskMessage = styled.p`
  color: #999;
  text-align: center;
  margin-top: 20px;
`;
