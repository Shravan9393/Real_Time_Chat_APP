// import React, { useState } from "react";
// import "../styles/profilePage.css";

// const ProfilePage = ({ user, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const onOpen = () => setIsOpen(true);
//   const onClose = () => setIsOpen(false);

//   return (
//     <>
//       {children ? (
//         <span onClick={onOpen}>{children}</span>
//       ) : (
//         <button className="icon-button" onClick={onOpen}>
//           🔍 {/* Replace with a view icon if needed */}
//         </button>
//       )}

//       {isOpen && (
//         <div className="modal-overlay" onClick={onClose}>
//           <div
//             className="modal-content"
//             onClick={(e) =>
//               e.stopPropagation()
//             } /* Prevent closing when clicking inside the modal */
//           >
//             <div className="modal-header">
//               <h2>{user.name}</h2>
//               <button className="close-button" onClick={onClose}>
//                 &times;
//               </button>
//             </div>
//             <div className="modal-body">
//               <img className="profile-image" src={user.pic} alt={user.name} />
//               <p>Email: {user.email}</p>
//             </div>
//             <div className="modal-footer">
//               <button className="close-button-footer" onClick={onClose}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfilePage;

import React, { useState } from "react";

const ProfilePage = ({ user, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
          onClick={onOpen}
        >
          🔍
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={onClose}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "400px",
              padding: "20px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ margin: 0 }}>{user.name}</h2>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <img
                src={user.pic}
                alt={user.name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <p style={{ marginTop: "16px" }}>Email: {user.email}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
