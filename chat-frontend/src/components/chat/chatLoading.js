// import { Stack } from "@chakra-ui/layout";
// import { Skeleton } from "@chakra-ui/skeleton";

// const ChatLoading = () => {
//   return (
//     <Stack>
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//       <Skeleton height="45px" />
//     </Stack>
//   );
// };

// export default ChatLoading;



const ChatLoading = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          style={{
            height: "45px",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            animation: "loading 1.5s infinite",
          }}
        ></div>
      ))}
      <style>
        {`
          @keyframes loading {
            0% {
              background-color: #f0f0f0;
            }
            50% {
              background-color: #e0e0e0;
            }
            100% {
              background-color: #f0f0f0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChatLoading;
