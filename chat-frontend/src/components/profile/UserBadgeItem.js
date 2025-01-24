// import { CloseIcon } from "@chakra-ui/icons";
// import { Badge } from "@chakra-ui/layout";

// const UserBadgeItem = ({ user, handleFunction, admin }) => {
//   return (
//     <Badge
//       px={2}
//       py={1}
//       borderRadius="lg"
//       m={1}
//       mb={2}
//       variant="solid"
//       fontSize={12}
//       colorScheme="purple"
//       cursor="pointer"
//       onClick={handleFunction}
//     >
//       {user.name}
//       {admin === user._id && <span> (Admin)</span>}
//       <CloseIcon pl={1} />
//     </Badge>
//   );
// };

// export default UserBadgeItem;



const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 8px",
        margin: "4px",
        backgroundColor: "#6B46C1",
        color: "white",
        borderRadius: "8px",
        fontSize: "12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span style={{ marginLeft: "4px" }}>(Admin)</span>}
      <span
        style={{
          marginLeft: "8px",
          fontSize: "10px",
          cursor: "pointer",
        }}
      >
        &#x2716; {/* Unicode for a close (X) icon */}
      </span>
    </span>
  );
};

export default UserBadgeItem;
