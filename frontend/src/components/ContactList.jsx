import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-[#272747]/60 p-4 rounded-lg cursor-pointer hover:bg-[#505081]/50 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* TODO */}
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4 className="text-[#8686AC] font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;
