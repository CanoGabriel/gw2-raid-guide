import React, { useState } from "react";
import { TextInput } from "../../shared";
import FormBoss from "../../domains/raid/components/form-boss/form-boss";

const Test = () => {
  const [text, setText] = useState();

  return (
    <main>
      <TextInput value={text} onChange={(newText) => setText(newText)} name="test" placeholder="coucou" />
      <FormBoss onSubmit={(data) => console.log(data)} onValidate={() => ({})} />
    </main>
  );
};

export default Test;
