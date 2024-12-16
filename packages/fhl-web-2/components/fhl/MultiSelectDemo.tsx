import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "../ui/select";

export default function SelectDemo() {
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const [selectedApple, setSelectedApple] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <Select onValueChange={(value) => setSelectedFruit(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedFruit === "apple" && (
        <Select onValueChange={(value) => setSelectedApple(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an apple type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Apple Types</SelectLabel>
              <SelectItem value="granny_smith">Granny Smith</SelectItem>
              <SelectItem value="pink_lady">Pink Lady</SelectItem>
              <SelectItem value="honeycrisp">Honeycrisp</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <div>
        Selected Fruit: {selectedFruit}
        {selectedFruit === "apple" && selectedApple && (
          <>, Apple Type: {selectedApple}</>
        )}
      </div>
    </div>
  );
}
