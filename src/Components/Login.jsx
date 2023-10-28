import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Users from "./users";

function Login({ userData }) {
  const [user, SetUser] = useState("");
  const [password, setPassword] = useState("");
  const [toastTrigger, setToastTrigger] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [singleUser, setSingleUser] = useState([]);

  const handleLogin = () => {
    // console.log(user);
    // console.log(password);
    let user1 = userData.filter((elem) => {
      return elem.username === user && elem.password === password;
    });

    setSingleUser(user1);
    if (user1.length !== 0) {
      console.log(user1[0]);
      onOpen();
      return true;
    } else return false;
  };

  const toast = useToast();
  return (
    <Box w={"400px"} m={" auto"} pb={6}>
      <Heading size={"lg"} mb={10}>
        User Login
      </Heading>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Username"
          onChange={(e) => {
            SetUser(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <Button
        mt={5}
        onClick={() => {
          const toastTrigger = handleLogin();
          toastTrigger
            ? toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 4000,
                position: "top",
                isClosable: true,
              })
            : toast({
                title: "Wrong Credentials",
                description: "Please try again !",
                status: "error",
                duration: 3000,
                position: "bottom",
                isClosable: true,
              });
        }}
      >
        Sign In
      </Button>
      <Users isOpen={isOpen} onClose={onClose} user={singleUser} />
    </Box>
  );
}

export default Login;
