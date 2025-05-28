import wordService from "../../services/words";
import suggestionService from "../../services/suggestions";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSetNotification } from "../../context/NotificationContext";

const HandleSuggestion = () => {
  const dispatch = useSetNotification();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["suggestions"],
    queryFn: suggestionService.getAllSuggestions,
    retry: 1,
  });

  const newWordMutation = useMutation({
    mutationFn: wordService.create,
    onSuccess: (newWord, oldWord) => {
      const words = queryClient.getQueryData(["words"]) || [];
      queryClient.setQueryData(["words"], words.concat(newWord));
      setTimeout(() => {
        dispatch("CUSTOM", {
          message: `Uusi slangisana: ${newWord.word} lisätty!`,
          color: "green",
        });
      }, 1000);
      deleteSuggestionMutation.mutate(oldWord);
    },
    onError: (error) => {
      dispatch("CUSTOM", {
        message: `Sanan lisääminen epäonnistui!`,
        color: "red",
      });
    },
  });

  const deleteSuggestionMutation = useMutation({
    mutationFn: (word) => suggestionService.eraseSuggestion(word.id),
    onSuccess: (_, word) => {
      queryClient.invalidateQueries(["suggestions"]);
      dispatch("CUSTOM", {
        message: `Ehdotus: ${word.word} poistettu ehdotuksista!`,
        color: "green",
      });
    },
  });

  const refuseSuggestion = (word) => {
    if (window.confirm(`Poista ehdotus: ${word.word} ehdotuksista`)) {
      deleteSuggestionMutation.mutate(word);
    }
  };

  if (result.isLoading) {
    return <div> loading data.... </div>;
  }
  if (result.isError) {
    return <div>Voe rähmän käpälä, vuan joku män rikki!</div>;
  }

  const suggestions = result.data;

  return (
    <div>
      <h2>Sana Ehdotukset</h2>
      {suggestions[0] ? (
        <div>
          <h3> Uusi Ehdotus </h3>
          <div>Sana: {suggestions[0].word}</div>
          <div>Käännös: {suggestions[0].translation}</div>
          {suggestions[0].usage ? (
            <div>Käyttöesimerkki: {suggestions[0].usage}</div>
          ) : (
            <div> Käyttöesimerkkiä ei annettu! </div>
          )}
          <button onClick={() => newWordMutation.mutate(suggestions[0])}>
            Hyväksy
          </button>
          <button onClick={() => refuseSuggestion(suggestions[0])}>
            Hylkää
          </button>
        </div>
      ) : (
        <div> Ei uusia ehdotuksia </div>
      )}
    </div>
  );
};

export default HandleSuggestion;
