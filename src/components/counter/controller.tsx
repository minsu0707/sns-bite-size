import { useDecrease, useIncrease } from "@/store/count";
import { Button } from "../ui/button";

export default function Controllеr() {
  const increase = useIncrease();
  const decrease = useDecrease();

  return (
    <div>
      <Button onClick={increase}>+</Button>
      <Button onClick={decrease}>-</Button>
    </div>
  );
}
