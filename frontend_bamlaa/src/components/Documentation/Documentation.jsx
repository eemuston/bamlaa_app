const Documentation = () => {
    return (
        <div className="Documentationcontainer" style={{ padding: '1rem', maxWidth: 800, margin: 'auto' }}>
            <h1>API Dokumentaatio: Slangisanat API</h1>
            <h2>Yleiskuvaus</h2>
            <p>Tämä API tarjoaa lukuoikeuden slangisanoihin tietokannassa.</p>
            <h2>Päätepisteet</h2>
            <h3>1. Hae kaikki sanat</h3>
            <p><b>URL:</b> /api/words</p>
            <p><b>Metodi:</b> GET</p>
            <p><b>Kuvaus:</b> Palauttaa listan kaikista slangisanoista tietokannasta.</p>
            <p><b>Esimerkkivastaus:</b></p>
            <pre>
                <code>
                    {`Request: GET https://bamlaa.fi/api/words

Response:
[
    {
        "word": "skuru",
        "translation": "raitiovaunu",
        "usage": "Pistä mulle pari huggee, et pääsen skurul himaa.",
        "id": "68366c08d89712066c6c82ab"
    },
    {
        "word": "bamlaa",
        "translation": "puhua / jutella",
        "usage": "Mennää klitsuu niin saadaa bamlaa kaikes rauhas",
        "id": "68367d31d89712066c6c837e"
    },
    ...
]`
                    }
                </code>
            </pre>
            <h3>2. Hae sana tunnuksella</h3>
            <p><b>URL:</b> /api/words/:id</p>
            <p><b>Metodi:</b> GET</p>
            <p><b>Kuvaus:</b> Palauttaa yhden slangisanan sen uniikin tunnuksen perusteella.</p>
            <p><b>URL-parametrit:</b> id - sanan uniikki tunniste(merkkijono).</p>
            <p><b>Esimerkkivastaus:</b></p>
            <pre>
                <code>
                {`Request: GET https://bamlaa.fi/api/words/68366c08d89712066c6c82ab

Response:
{
  "word": "skuru",
  "translation": "raitiovaunu",
  "usage": "Pistä mulle pari huggee, et pääsen skurul himaa.",
  "id": "68366c08d89712066c6c82ab"
}

404 Not Found if the word does not exist.`}
                </code>
            </pre>

            <h2>Virheviestit</h2>
            <ul>
                <li><b>404</b> - Word not found.</li>
                <li><b>500</b> - Server error.</li>
            </ul>
            <h2>Huomioita</h2>
            <p>Ei vaadi autentikointia</p>
            <p>API on vain lukuoikeuksinen, ei mahdollista tietojen muokkausta</p>
        </div>
    )
}

export default Documentation