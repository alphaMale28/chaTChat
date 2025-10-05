import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();

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
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4 className="trxt-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;
