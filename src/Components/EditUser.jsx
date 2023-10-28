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

function EditUser({
  isEditOpen,
  onEditClose,
  username,
  pass,
  firstname,
  lastname,
  dob,
  contact,
  email,
  id,
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [userName, setUserName] = useState(username);
  const [password, setPassword] = useState(pass);
  const [firstName, setFirstName] = useState(firstname);
  const [lastName, setLastName] = useState(lastname);
  const [Dob, setDob] = useState(dob);
  const [mobile, setMobile] = useState(contact);
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
  const [Email, setEmail] = useState(email);

  function formatDOB(dateString) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const editUser = () => {
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
        name: firstName + " " + lastName,
        Dob: dob,
        contact: mobile,
        email: Email,
      };
      axios.patch(`/users/${id}`, user);
      onEditClose();
      alert("User Information Edited");
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
        isOpen={isEditOpen}
        onClose={onEditClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                editUser(id);
              }}
            >
              `` Save
            </Button>
            <Button onClick={onEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditUser;
