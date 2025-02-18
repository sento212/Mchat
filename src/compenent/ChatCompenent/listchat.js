import React, { useState, useEffect } from "react";
import { Stack, Row, Col, Image, ListGroup } from "react-bootstrap";
import { listpeople } from "../../request_api/web_listuser";

export default function ListChat({ setCliked, Cliked, token, setEnemy }) {
  const { list } = listpeople(token);

  return (
    <ListGroup variant="flush" className="w-100" style={{ minWidth: "300px" }}>
      {list["data"] != null
        ? list["data"].map((user) => (
            <Show
              key={user.conversation_id}
              id={user.conversation_id}
              name={user.name_enemy}
              Cliked={Cliked}
              setCliked={setCliked}
              chat={user.chat_inside}
              date={user.entry_date}
              setEnemy={setEnemy}
            ></Show>
          ))
        : ""}
    </ListGroup>
  );
}

function Show({ id, name, Cliked, setCliked, chat, date, setEnemy }) {
  const [isHovered, setIsHovered] = useState(false);

  let styled = {};
  if (Cliked == id) {
    styled = {
      backgroundColor: "#ededed",
      minWidth: "315px",
    };
  } else {
    styled = {
      backgroundColor: isHovered ? "#ededed" : "#ffffff",
      minWidth: "315px",
    };
  }

  const originalString = chat ?? "";
  const maxLength = 25;

  const truncatedString =
    originalString.length > maxLength
      ? `${originalString.substring(0, maxLength)}...`
      : originalString;

  return (
    <ListGroup.Item
      onClick={() => {
        setCliked(id);
        setEnemy(name);
      }}
      style={styled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Row>
        <Col sm={2} className="ms-3 me-1 ps-1 p-0">
          <Image
            src="/sento/mchat/images/testingaaa.jpg"
            width={50}
            height={100}
            className="border border-dark-subtle"
            roundedCircle
          />
        </Col>
        <Col sm={7}>
          <Stack>
            <div
              className=" text-start  p-0 "
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              {name}
            </div>
            <div className=" text-start  p-0 " style={{ fontSize: "12px" }}>
              <div className="text-wrap" style={{ width: "8rem" }}>
                {truncatedString}
              </div>
            </div>
          </Stack>
        </Col>
        <Col sm={2} className="text-end pt-1 p-0" style={{ fontSize: "11px" }}>
          {date}
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
