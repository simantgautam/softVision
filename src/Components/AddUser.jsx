import React, { useState } from "react";
import axios from "./api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { isValidMobileNumber } from "./mobileNoChecker";

function AddUser({ isOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
  const [Email, setEmail] = useState("");

  function formatDOB(dateString) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const addUser = () => {
    console.log(isMobileNumberValid);
    const dob = formatDOB(Dob);
    if (dob === "Invalid Date") {
      alert("Invalid Data");
      return;
    }
    if (
      userName !== "" &&
      password !== "" &&
      firstName !== "" &&
      Dob !== "" &&
      mobile !== "" &&
      Email !== "" &&
      isMobileNumberValid
    ) {
      let user = {
        username: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        Dob: dob,
        contact: mobile,
        email: Email,
      };
      axios.post("/users", user);
      onClose();
      alert("User Added");
    } else if (
      userName === "" ||
      password === "" ||
      firstName === "" ||
      Dob === "" ||
      mobile === "" ||
      Email === ""
    ) {
      alert("Enter All Required Fields");
    } else if (!isMobileNumberValid) alert("Enter Valid Mobile Number");
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add A New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Date Of Birth</FormLabel>
              <Input
                placeholder="Date Of Birth (DD-MM-YYYY)"
                type="date"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Mobile Number"
                onChange={(e) => {
                  setMobile(e.target.value);
                  setIsMobileNumberValid(isValidMobileNumber(e.target.value));
                }}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Email Id</FormLabel>
              <Input
                placeholder="Email Id"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addUser}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUser;
