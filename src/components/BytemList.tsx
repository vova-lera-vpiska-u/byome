import { $bytemsSorted } from "../shared/model";
import { BytemCard } from "./BytemCard";
import { useUnit } from "effector-react";

export const BytemList = () => {
  const bytems = useUnit($bytemsSorted);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", width: "100%" }}>
      {bytems.map((bytem) => (
        <BytemCard key={bytem._id} bytem={bytem} />
      ))}
    </div>
  );
};
