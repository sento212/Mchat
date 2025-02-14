"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ListChat from "../../compenent/ChatCompenent/listchat";
import Detailchat from "../../compenent/ChatCompenent/headerchat";
import Isichat from "../../compenent/ChatCompenent/writechat";
import Alert from "../../compenent/alert";
import {
  Button,
  Modal,
  Form,
  Stack,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { api, api_tambah } from "../../request_api/api_temen";

const Mainpage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const Session = useSelector((state) => state.Session.value);
  const [Cliked, setCliked] = useState("");
  const [enemy, setEnemy] = useState("");
  const [Testing, setTest] = useState([]);
  const hasRun = useRef(null);
  const [shew, setShew] = useState("NO");

  useEffect(() => {
    if (Session["status_login"] != "yes") {
      router.replace("/");
    } else {
      setShew("YES");
    }
  }, []);

  useEffect(() => {
    if (Cliked != "") {
      if (hasRun.current != Cliked) {
        const foundItem = Testing.find((item) => item.id == Cliked);
        if (!foundItem) {
          const Pesan_simpan = (
            <div>
              <Detailchat enemy={enemy}></Detailchat>
              <Isichat
                token={Session["token"]}
                id={Cliked}
                user={Session["username"]}
              ></Isichat>
            </div>
          );

          const hasil = { id: Cliked, data: Pesan_simpan };
          setTest([...Testing, hasil]);
        }
        hasRun.current = Cliked;
      }
    } else {
      const Pesan_Tampil = (
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <div className="text-center w-100">
            {" "}
            <FontAwesomeIcon icon={faDoorOpen} size="3x" />
          </div>
          <div
            className="text-center w-100"
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Welcome to Mchat {Session["username"]}
          </div>
        </Stack>
      );
      const hasil = { id: "", data: Pesan_Tampil };
      setTest([...Testing, hasil]);
    }
  }, [Cliked]);

  if (shew == "YES") {
    return Tampilan();
  }

  function Tampilan() {
    return (
      <Container fluid>
        <Row className="flex-nowrap">
          <Col
            sm={3}
            className="flex-shrink-1 p-0"
            style={{ minWidth: "310px" }}
          >
            <Row
              className="justify-content-between py-2 px-1 border-bottom"
              style={{ height: "50px" }}
            >
              <Col
                sm={3}
                className="align-self-center"
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {Session["username"]}
              </Col>
              <Col sm={3} className="text-center align-self-center">
                <button onClick={handleShow}>
                  <FontAwesomeIcon icon={faUserPlus} />
                </button>
                <Modale
                  show={show}
                  handleClose={handleClose}
                  token={Session["token"]}
                ></Modale>
              </Col>
            </Row>
            <Row
              sm={3}
              style={{
                overflowY: "scroll",
                height: "92vh",
                overflowX: "hidden",
                minWidth: "100%",
              }}
            >
              <ListChat
                setCliked={setCliked}
                Cliked={Cliked}
                token={Session["token"]}
                setEnemy={setEnemy}
              />
            </Row>
          </Col>
          <Col sm={9} style={{ backgroundColor: "#e3e3e3" }}>
            {Testing.map((list_user, index) => (
              <div
                key={index}
                className="h-100"
                style={{ display: list_user.id == Cliked ? "block" : "none" }}
              >
                {list_user.data}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
};

function Modale({ show, handleClose, token }) {
  const [list, setlist] = useState([]);
  const [Hasilcari, setHasilcari] = useState("");

  async function cari(list_Cari) {
    setHasilcari(list_Cari);
    const response = await api(list_Cari, token);
    let hasil = response.data;
    if (hasil["status"] == 200) {
      setlist(hasil.data);
    } else {
      Alert("Gagal Login", "terdapat masalah dengan server", "error");
    }
  }

  async function tambah_le() {
    const data = {
      name_temen: Hasilcari,
    };
    const response = await api_tambah(data, token);
    let hasil = response.data;
    if (hasil["status"] == 200) {
      Alert("Tambah temen berhasil", "temen ditambah", "success");
      handleClose();
    } else {
      Alert("Gagal Login", hasil.message, "error");
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Friend</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <Form.Control
            type="text"
            onChange={(e) => cari(e.target.value)}
            value={Hasilcari}
          />
          <Form.Select
            className="p-0"
            multiple
            htmlSize={5}
            onClick={(e) => {
              if (list.length != 0) {
                console.log(list.length);
                setHasilcari(e.target.value);
                setlist([]);
              }
            }}
          >
            {list.map((list_user, index) => (
              <option value={list_user["username"]} key={index}>
                {list_user["username"]}
              </option>
            ))}
          </Form.Select>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button
          onClick={(e) => {
            tambah_le();
          }}
        >
          Add Friend
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Mainpage;
