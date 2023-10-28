import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "./api";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditUser from "./EditUser";

function Users({ user, isOpen, onClose }) {
  const { isOpen: isEditOpen, onOpen, onClose: onEditClose } = useDisclosure();
  // console.log(user);
  const handleDelete = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((deletedData) => {
        console.log("Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"25px"}>User Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box display={"flex"} justifyContent={"space-between"} mb={5}>
              <Box>
                <Text fontWeight={"bold"}>Name</Text>{" "}
              </Box>
              <Box fontWeight={"bold"}>
                {user[0]?.firstName + " " + user[0]?.lastName}
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={5}>
              <Box>
                <Text fontWeight={"bold"}>Date Of Birth</Text>{" "}
              </Box>
              <Box fontWeight={"bold"}>{user[0]?.Dob}</Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={5}>
              <Box>
                <Text fontWeight={"bold"}>Mobile Number</Text>{" "}
              </Box>
              <Box fontWeight={"bold"}>{user[0]?.contact}</Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={5}>
              <Box>
                <Text fontWeight={"bold"}>Email Id</Text>{" "}
              </Box>
              <Box fontWeight={"bold"}>{user[0]?.email}</Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                onOpen();
              }}
            >
              Edit
            </Button>
            <EditUser
              onEditClose={onEditClose}
              isEditOpen={isEditOpen}
              username={user[0]?.username}
              pass={user[0]?.password}
              firstname={user[0]?.firstName}
              lastname={user[0]?.lastName}
              dob={user[0]?.Dob}
              contact={user[0]?.contact}
              email={user[0]?.email}
              id={user[0]?.id}
            />
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleDelete(user[0]?.id);
              }}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Users;
