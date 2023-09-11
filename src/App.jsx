import { useState } from "react";
import { QuizComponent } from "./components/QuizComponent";
import { FormComponent } from "./components/FormComponent";
import StartMenu from "./components/StartMenu";
import InstructionsPopup from "./components/InstructionsPopup";

function App() {
  const [formVisible, setFormVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const onStart = () => {
    setShowStartMenu(false);
  };

  const displayInstructions = () => {
    setShowInstructions(true);
  };

  const hideInstructions = () => {
    setShowInstructions(false);
  };

  const onSubmitUsername = () => {
    setFormVisible(false);
    setShowStartMenu(true);
  };

  return (
    <div className="App">
      <header>
        {formVisible && (
          <FormComponent
            setUsername={setUsername}
            setFormVisible={setFormVisible}
            onSubmit={onSubmitUsername} // Pass the new function instead of setFormVisible
          />
        )}
        {showStartMenu && (
          <StartMenu
            onStart={onStart}
            currentUser={username}
            displayInstructions={displayInstructions}
            hideInstructions={hideInstructions}
          />
        )}
      </header>
      <main>
        {!formVisible && !showStartMenu && (
          <QuizComponent username={username} />
        )}
      </main>
      {showInstructions && <InstructionsPopup onClose={hideInstructions} />}
    </div>
  );
}

export default App;
