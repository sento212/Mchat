"use client";
import React, { useState } from "react";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import Link from "next/link";
import api from "../../request_api/api_daftar";
import Alert from "../../compenent/alert";
import { useRouter } from "next/navigation";

const Daftar = () => {
  const [username, setUsername] = useState("");
  const [passwoard, setPasswoard] = useState("");
  const router = useRouter();

  async function submiting() {
    const data = {
      user: username,
      pass: passwoard,
    };

    if (username != "" || passwoard != "") {
      const response = await api(data);
      if (response["status"] == 200) {
        let hasil = response.data;
        console.log(hasil);
        if (hasil["status"] == 200) {
          Alert("Sudah ada akun", "Silahkan Login", "success");
          router.push("/");
        } else {
          Alert("Gagal Login", hasil["message"], "error");
        }
      } else {
        Alert("Gagal Login", "terdapat masalah dengan server", "error");
      }
    } else {
      Alert("Gagal Login", "username atau password kosong", "error");
    }
  }
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="align-items-center justify-content-center h-100">
        <Card
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ width: "30rem" }}
        >
          <Row className="align-items-center justify-content-center gap-2">
            <Col sm={12} className="text-center">
              <h1>Daftar Mchat</h1>{" "}
            </Col>
            <Col sm={3}>Username</Col>
            <Col sm={8}>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Col>
            <div className="w-100"></div>
            <Col sm={3}>Password</Col>
            <Col sm={8}>
              <Form.Control
                type="password"
                onChange={(e) => setPasswoard(e.target.value)}
              ></Form.Control>
            </Col>
            <Col>
              <Button
                className="btn btn-success w-100"
                type="button"
                onClick={submiting}
              >
                Login
              </Button>
            </Col>
            <Col sm={12} className="text-center">
              have an account??? <Link href="/">log in here!!!</Link>
            </Col>
          </Row>
        </Card>
      </Row>
    </Container>
  );
};

export default Daftar;
