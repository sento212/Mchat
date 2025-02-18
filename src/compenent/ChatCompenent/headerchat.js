import React from "react";
import { Stack, Row, Image, Button } from "react-bootstrap";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { reset } from "../../store/slice/seasionslice";
import { useDispatch } from "react-redux";

export default function Detailchat({ enemy }) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Row
      className="border-bottom"
      style={{ backgroundColor: "#ededed", height: "50px" }}
    >
      <Stack direction="horizontal" className="align-items-center" gap={3}>
        <Image
          src="/sento/mchat/images/testingaaa.jpg"
          width={40}
          height={10}
          className="border border-dark-subtle"
          roundedCircle
        ></Image>
        <div className="p-0 align-self-center">{enemy}</div>
        <Button
          className="ms-auto"
          variant="dark"
          onClick={(e) => {
            dispatch(reset());
            router.push("/");
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} size="lg" rotation={180} />
        </Button>
      </Stack>
    </Row>
  );
}
