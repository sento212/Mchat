"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sesions, reset } from "../../store/slice/seasionslice";
import { useDispatch } from "react-redux";
import Alert from "../compenent/alert";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import api from "../../request_api/api_login";
import { useSelector } from "react-redux";

const Home = () => {
  const [username, setUsername] = useState("");
  const [passwoard, setPasswoard] = useState("");
  const Session = useSelector((state) => state.Session.value);
  const dispatch = useDispatch();
  const router = useRouter();

  if (Session["status_login"] == "yes") {
    router.push("/dashboard");
  } else {
    return show();
  }

  async function submit(e) {
    const data = {
      user: username,
      pass: passwoard,
    };
    if (username != "" || passwoard != "") {
      const response = await api(data);
      let hasil = response.data;
      if (hasil["status"] == 200) {
        if (hasil["data"].length != 0) {
          dispatch(
            sesions({
              username: hasil["data"][0]["username"],
              token: hasil["key_token"],
              status_login: "yes",
            })
          );
          router.push("/dashboard");
        } else {
          dispatch(reset());
          Alert("Gagal Login", "username atau password salah", "error");
        }
      } else {
        Alert("Gagal Login", "terdapat masalah dengan server", "error");
      }
    } else {
      Alert("Gagal Login", "username atau password kosong", "error");
    }
  }

  function show() {
    return (
      <Container fluid style={{ height: "100vh" }}>
        <Row className="h-100 align-items-center justify-content-center">
          <Col sm={6}>
            <Card className="shadow p-3 mb-5 bg-white rounded">
              <Row className="text-center g-2">
                <Col sm={12}>
                  <h1>Mchat Login</h1>{" "}
                </Col>
                <Col sm={4}> username</Col>
                <Col sm={8}>
                  <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  ></Form.Control>
                </Col>
                <Col sm={4}> password</Col>
                <Col sm={8}>
                  <Form.Control
                    onChange={(e) => setPasswoard(e.target.value)}
                    type="password"
                  ></Form.Control>
                </Col>
                <Col sm={12}>
                  <Button
                    className="btn btn-primary w-100"
                    type="button"
                    onClick={submit}
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Home;
