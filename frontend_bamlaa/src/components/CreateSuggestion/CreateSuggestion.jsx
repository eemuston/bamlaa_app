import { useState } from "react";
import suggestionService from "../../services/suggestions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetNotification } from "../../context/NotificationContext";

const CreateSuggestion = () => {
  const queryClient = useQueryClient();
  const dispatch = useSetNotification();
  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");
  const [newUsage, setNewUsage] = useState("");

  const newSuggestionMutation = useMutation({
    mutationFn: suggestionService.createSuggestion,
    onSuccess: (newWord) => {
      const words = queryClient.getQueryData(["suggestions"]) || [];
      queryClient.setQueryData(["suggestions"], words.concat(newWord));
      dispatch("CUSTOM", {
        message: `Uusi slangisana: ${newWord.word} ehdotettu!`,
        color: "green",
      });
      setNewWord("");
      setNewTranslation("");
      setNewUsage("");
    },
    onError: (error) => {
      dispatch("CUSTOM", {
        message: `Sanan ehdottaminen epäonnistui!`,
        color: "red",
      });
    },
  });

  const addWord = (event) => {
    event.preventDefault();
    newSuggestionMutation.mutate({
      word: newWord,
      translation: newTranslation,
      usage: newUsage,
    });
  };

  return (
    <div>
      <h2>Ehdota uutta sanaa tietokantaan lisättäväksi</h2>
      <form onSubmit={addWord}>
        <div>
          <label>
            slangisana:
            <input
              name="word"
              value={newWord}
              onChange={(event) => setNewWord(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            käännös:
            <input
              name="translation"
              value={newTranslation}
              onChange={(event) => setNewTranslation(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            käyttöesimerkki:
            <textarea
              name="usage"
              value={newUsage}
              onChange={(event) => setNewUsage(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  );
};

export default CreateSuggestion;
