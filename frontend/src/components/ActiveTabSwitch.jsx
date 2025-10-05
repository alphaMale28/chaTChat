import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats"
            ? "bg-[#505081] text-[#070717]"
            : "text-[#8686AC]"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts"
            ? "bg-[#505081] text-[#070717]"
            : "text-[#8686AC]"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
