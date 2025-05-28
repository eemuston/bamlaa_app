# 🧠 Projekti: Bamlaa.fi

## 🎯 Projektin idea:
Stadinslangin opettamiseen keskittyvä verkkosivusto, jossa on sekä julkinen käyttöliittymä että hallintapaneeli.
Kohderyhmänä slangista kiinnostuneet, slangin opiskelijat, devaajat ja mahdollisesti yhteisö (foorumin kautta).

## 🖥️ Julkinen käyttöliittymä (Public Interface)
✅ Päivän sana
Näytetään etusivulla – random sana päädatabasesta.

✅ Harjoittelu quiz
Näytetään joko suomenkielinen tai slangisana ja neljä vaihtoehtoa, joista valitaan oikea käännös.

✅ Sanaston selaus (optional)
Lista kaikista päädatabasen sanoista.

✅ Sanojen ehdotuslomake
Lomake, jolla käyttäjät voivat ehdottaa uusia slangisanoja tai niiden käyttötapoja.

✅ API-dokumentaatio näkymä
/api/words GET–rajapinta avoimena muille projekteille.
Selkeä kuvaus: miten käyttää, esimerkkikyselyt jne.

## 🔒 Admin dashboard
🔧 Kirjautuminen tokenilla / piilotettu route

✏️ Uusien quiz-sanojen lisäys quiz-databaselle

✅ Sanaehdotusten hyväksyminen
→ siirretään sana päädatabaseen
→ poistetaan sana ehdotusdatabasesta

❌ Sanaehdotuksen hylkääminen
→ sana poistetaan ehdotusdatabasesta

## 🗃️ Tietokannat (MongoDB Atlas)
words (päädatabase hyväksytyille sanoille)
 – Sana, suomennos, käyttöesimerkki

suggestions (käyttäjien ehdotukset)
 – Sana, suomennos, käyttöesimerkki

users 

## 🧱 Teknologiat
Frontend: React + Vite

Backend: Node.js + Express

Tietokanta: MongoDB Atlas

Auth (admin): JWT-token

Deployment: Vercel (frontend) + Render / Railway / Fly.io (backend)
