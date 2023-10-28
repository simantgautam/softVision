import { Heading, useDisclosure, Button, Box } from "@chakra-ui/react";
import React from "react";
import AddUser from "./AddUser";
import Users from "./users";
import Login from "./Login";

function UserList({ userData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Heading p={5} bgColor={"black"} color={"white"}>
        Users Hub
      </Heading>
      {/* <Users userData={userData} /> */}
      <Box
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
        p={10}
        w={500}
        m={"50px auto"}
      >
        <Login userData={userData} />
        <p>Not Sign Up ?</p>
        <Button
          m={5}
          w={300}
          bgColor={"#2C7A7B"}
          color={"white"}
          onClick={onOpen}
          _hover={"none"}
        >
          Sign Up
        </Button>
        <AddUser isOpen={isOpen} onClose={onClose} />
      </Box>
    </div>
  );
}

export default UserList;
