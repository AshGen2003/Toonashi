import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type ClerkUser = { id: string; [key: string]: any };

export default function MyList() {
  const { user, isSignedIn } = useUser() as { user: ClerkUser | null; isSignedIn: boolean };
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isSignedIn && user) {
      // Fetch user's list from backend or localStorage
      const fetchData = async () => {
        const response = await fetch(`/api/mylist?userId=${user.id}`);
        const data = await response.json();
        setList(data.items || []);
      };
      fetchData();
    } else {
      // Remove user's list from state and localStorage on logout
      if (user) {
        localStorage.removeItem(`mylist-${user.id}`);
      }
      setList([]);
    }
  }, [isSignedIn, user]);

  const addToList = async () => {
    if (!input) return;
    const updated = [...list, input];
    setList(updated);
    if (user) {
      // Send the new item to the backend
      await fetch(`/api/mylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, item: input }),
      });
    }
    setInput("");
  };

  if (!isSignedIn) return <div>Please sign in to view your list.</div>;

  return (
    <div>
      <h2>My List</h2>
      <ul>
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add item"
      />
      <button onClick={addToList}>Add</button>
    </div>
  );
}