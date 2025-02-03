import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Form, Stack, Row, Col } from "react-bootstrap";
import listchat from "../../request_api/web_listchat";

export default function Isichat({ token, id, user }) {
  const [Chat, setChat] = useState("");
  const containerRef = useRef(null);

  const { sendMessage, pesane } = listchat(token, id);

  return Tampilan(pesane, user);

  function Tampilan(pesan, usera) {
    function musuh(text, time) {
      return (
        <Col sm={6}>
          <Stack
            className=" rounded-3 p-2 ms-3 my-1 border"
            style={{ display: "inline-block", backgroundColor: "#d9d9d9" }}
          >
            <p className="text-break">{text}</p>
            <div
              className="text-end"
              style={{
                fontSize: "11px",
              }}
            >
              {time}
            </div>
          </Stack>
        </Col>
      );
    }

    function sendiri(text, time) {
      return (
        <Col sm={6} className="offset-md-6 text-end">
          <Stack
            className=" rounded-3 p-2 me-3 my-1"
            style={{ display: "inline-block", backgroundColor: "#8799ff" }}
          >
            <p className="text-break">{text}</p>
            <div
              className="text-end"
              style={{
                fontSize: "11px",
              }}
            >
              {time}
            </div>
          </Stack>
        </Col>
      );
    }

    async function sendchat() {
      const hasil = `{
          "chat": "${Chat}",
          "tipe": "put"
      }`;
      sendMessage(hasil);
      setChat("");
    }

    useEffect(() => {
      const element = containerRef.current;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, [pesan]);

    return (
      <Row
        className=" align-items-end"
        style={{
          backgroundImage: "url('/images/26669.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "92vh",
        }}
      >
        <Col
          sm={12}
          ref={containerRef}
          style={{
            overflowY: "scroll",
            height: "80vh",
            overflowX: "hidden",
          }}
        >
          <Row className="justify-content-between flex-column">
            {pesan["data"] != null ? (
              pesan["data"].map((user, index) => (
                <div key={index}>
                  {user.username == usera
                    ? sendiri(user.chat_inside, user.entry_date)
                    : musuh(user.chat_inside, user.entry_date)}
                </div>
              ))
            ) : (
              <div className="my-3 text-center">
                <FontAwesomeIcon icon={faSpinner} size="xl" spin />
              </div>
            )}
          </Row>
        </Col>

        <Col
          sm={12}
          className="align-content-center"
          style={{ backgroundColor: "#ededed", height: "70px" }}
        >
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              value={Chat}
              onChange={(e) => setChat(e.target.value)}
            ></Form.Control>
            <button onClick={sendchat} className="flex-shrink-0">
              <FontAwesomeIcon icon={faPaperPlane} size="xl" />
            </button>
          </Stack>
        </Col>
      </Row>
    );
  }
}
