// import { Avatar } from "@chakra-ui/avatar";
// import { Box, Text } from "@chakra-ui/layout";
// import { ChatState } from "../../context/chatContext";

// const UserListItem = ({ handleFunction }) => {
//   const { user } = ChatState();

//   return (
//     <Box
//       onClick={handleFunction}
//       cursor="pointer"
//       bg="#E8E8E8"
//       _hover={{
//         background: "#38B2AC",
//         color: "white",
//       }}
//       w="100%"
//       d="flex"
//       alignItems="center"
//       color="black"
//       px={3}
//       py={2}
//       mb={2}
//       borderRadius="lg"
//     >
//       <Avatar
//         mr={2}
//         size="sm"
//         cursor="pointer"
//         name={user.name}
//         src={user.pic}
//       />
//       <Box>
//         <Text>{user.name}</Text>
//         <Text fontSize="xs">
//           <b>Email : </b>
//           {user.email}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// export default UserListItem;



const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#E8E8E8",
        padding: "8px 12px",
        marginBottom: "8px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.3s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#38B2AC")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#E8E8E8")}
    >
      <img
        src={user.pic}
        alt={user.name}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          marginRight: "12px",
        }}
      />
      <div>
        <div style={{ fontWeight: "bold" }}>{user.name}</div>
        <div style={{ fontSize: "12px" }}>
          <b>Email: </b>
          {user.email}
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
