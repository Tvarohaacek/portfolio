/**
 * Data hospodských kvízů pro /kvizy (rozcestník) a /kvizy/<id> (konkrétní kvíz).
 *
 * ─── SYSTÉM ID KVÍZU ────────────────────────────────────────────────────────
 *
 *   Formát:   <okruh>-<rok>-<pořadí>          příklad:  pk-26-01
 *
 *   okruh    2 malá písmena = tematický okruh kvízu
 *              pk = Pardubický kraj      cr = Česká republika
 *              hu = hudba                fi = film
 *              sp = sport                ve = věda a technika
 *            (další zkratky přidávej podle potřeby, vždy dvě písmena)
 *
 *   rok      2 číslice = rok, kdy sada vznikla   (26 = 2026)
 *
 *   pořadí   2 číslice = pořadí kvízu v rámci daného okruhu a roku (01, 02, …)
 *
 *   Takže pk-26-01 = první kvíz o Pardubickém kraji z roku 2026.
 *   Druhý kvíz o kraji ve stejném roce = pk-26-02, první hudební = hu-26-01.
 *
 *   PRAVIDLO: jakmile je kvíz jednou venku, jeho ID se už nikdy nemění –
 *   URL /kvizy/<id> je trvalý odkaz a přejmenování by ho rozbilo.
 *
 * ─── PŘIDÁNÍ NOVÉHO KVÍZU ───────────────────────────────────────────────────
 *
 *   Stačí přidat další klíč do registru KVIZY níže. Rozcestník /kvizy se
 *   generuje z tohoto objektu automaticky, routa /kvizy/<id> taky – ve
 *   vercel.json ani v HTML není potřeba měnit nic.
 *
 * ─── STRUKTURA DAT ──────────────────────────────────────────────────────────
 *
 *   kvíz    id, title, subtitle, place, year, rounds[]
 *   kolo    title (název kola), questions[]
 *   otázka  q  … znění otázky
 *           o  … právě 4 možnosti; o[0] je VŽDY ta správná
 *                (pořadí se zamíchá až v prohlížeči, takže na pozici nezáleží)
 *           n  … volitelná poznámka, zobrazí se až po zodpovězení
 */

window.KVIZY = {
  'pk-26-01': {
    id: 'pk-26-01',
    title: 'Pardubický kraj',
    subtitle: 'Koně, perník, výbušniny a všechno mezi tím.',
    place: 'Pardubický kraj',
    year: 2026,
    rounds: [
      {
        title: 'Pardubice: koně, perník a výbušniny',
        questions: [
          {
            q: 'Jak se jmenuje nejobávanější překážka Velké pardubické, pojmenovaná po hraběti, který ji jako první zdolal?',
            o: ['Taxisův příkop', 'Havlův skok', 'Popkovický skok', 'Irská lavice'],
            n: 'Nese jméno hraběte Egona Thurn-Taxise.',
          },
          {
            q: 'Kolik metrů měří trať Velké pardubické steeplechase?',
            o: ['6 900 metrů', '4 400 metrů', '5 700 metrů', '8 200 metrů'],
          },
          {
            q: 'Který kůň vyhrál Velkou pardubickou hned čtyřikrát?',
            o: ['Železník', 'Korok', 'Peruán', 'Registana'],
            n: 'V letech 1987, 1988, 1989 a 1991, vždy s Josefem Váňou v sedle.',
          },
          {
            q: 'Kolikrát zvítězil ve Velké pardubické v sedle Josef Váňa?',
            o: ['Osmkrát', 'Šestkrát', 'Sedmkrát', 'Devětkrát'],
          },
          {
            q: 'Jaký plochodrážní závod se v Pardubicích jezdí nepřetržitě od roku 1929?',
            o: ['Zlatá přilba', 'Stříbrná přilba', 'Zlatá ostruha', 'Velká cena Pardubic'],
          },
          {
            q: 'Podle které pardubické průmyslové čtvrti dostala jméno plastická trhavina Semtex?',
            o: ['Semtín', 'Rosice nad Labem', 'Svítkov', 'Polabiny'],
          },
          {
            q: 'Kdo Semtex v roce 1964 vyvinul?',
            o: ['Stanislav Brebera', 'Otto Wichterle', 'Antonín Holý', 'Jaroslav Heyrovský'],
          },
          {
            q: 'Jak se jmenuje tmavý silný pardubický pivní speciál s 19 % extraktu, vařený od konce 19. století?',
            o: ['Pardubický Porter', 'Pardubický Granát', 'Pernštejn Speciál', 'Zelená brána 19°'],
          },
          {
            q: 'Jak vysoká je pardubická Zelená brána?',
            o: ['Zhruba 60 metrů', 'Zhruba 42 metrů', 'Zhruba 51 metrů', 'Zhruba 74 metrů'],
            n: 'Přesněji 59 metrů.',
          },
          {
            q: 'Ve které obci pod Kunětickou horou stojí Perníková chaloupka s muzeem perníku?',
            o: ['Ráby', 'Kunětice', 'Sezemice', 'Dříteč'],
          },
        ],
      },
      {
        title: 'Osobnosti, které se tu narodily',
        questions: [
          {
            q: 'Který cestovatel a badatel po Africe se narodil roku 1847 v Holicích?',
            o: ['Emil Holub', 'Alberto Vojtěch Frič', 'Enrique Stanko Vráz', 'Jan Welzl'],
          },
          {
            q: 'V jaké budově litomyšlského zámeckého areálu se narodil Bedřich Smetana?',
            o: ['V zámeckém pivovaru', 'V zámecké jízdárně', 'V budově piaristické koleje', 'V zámeckém špitálu'],
            n: 'Jeho otec byl sládek.',
          },
          {
            q: 'Ve věži kterého kostela v Poličce se narodil Bohuslav Martinů?',
            o: ['Kostel svatého Jakuba', 'Kostel svatého Michaela', 'Kostel svatého Bartoloměje', 'Kostel Nanebevzetí Panny Marie'],
          },
          {
            q: 'Kolik schodů vede k rodné světničce Bohuslava Martinů ve věži?',
            o: ['192', '148', '176', '232'],
          },
          {
            q: 'Který rodák z Chrudimi vynalezl lodní šroub?',
            o: ['Josef Ressel', 'Josef Božek', 'František Křižík', 'Václav Laurin'],
          },
          {
            q: 'Který slavný hokejový brankář se narodil v Pardubicích v roce 1965?',
            o: ['Dominik Hašek', 'Roman Čechmánek', 'Milan Hnilička', 'Petr Bříza'],
          },
          {
            q: 'Který průmyslník, který za války zachránil stovky Židů, se narodil ve Svitavách?',
            o: ['Oskar Schindler', 'Emil Škoda', 'Jindřich Waldes', 'Tomáš Baťa'],
          },
          {
            q: 'Architekt Josef Gočár se narodil v malé obci u Přelouče. Ve které?',
            o: ['Semín', 'Chvaletice', 'Řečany nad Labem', 'Valy'],
          },
          {
            q: 'Vynálezce bleskosvodu Prokop Diviš pocházel z Helvíkovic u kterého města?',
            o: ['Žamberk', 'Letohrad', 'Ústí nad Orlicí', 'Králíky'],
          },
          {
            q: 'Který skladatel, autor slavných klavírních skladeb a učitel mnoha romantiků, se narodil roku 1774 ve Skutči?',
            o: ['Václav Jan Tomášek', 'Jan Ladislav Dusík', 'Josef Mysliveček', 'Jakub Jan Ryba'],
          },
        ],
      },
      {
        title: 'Zámky, hrady a UNESCO',
        questions: [
          {
            q: 'Který zámek v kraji je od roku 1999 zapsán na seznamu UNESCO?',
            o: ['Zámek Litomyšl', 'Zámek Slatiňany', 'Zámek Nové Hrady', 'Zámek Moravská Třebová'],
          },
          {
            q: 'Kolik sgrafitových políček zhruba pokrývá fasádu litomyšlského zámku?',
            o: ['Přes 8 000', 'Přes 2 000', 'Přes 4 500', 'Přes 12 000'],
            n: 'A žádná dvě nejsou stejná.',
          },
          {
            q: 'Který hřebčín byl zapsán na seznam UNESCO v roce 2019?',
            o: ['Kladruby nad Labem', 'Slatiňany', 'Napajedla', 'Hostouň'],
          },
          {
            q: 'Který panovník povýšil kladrubský hřebčín roku 1579 na císařský?',
            o: ['Rudolf II.', 'Maxmilián II.', 'Ferdinand I.', 'Karel VI.'],
          },
          {
            q: 'Jakou barvu mají starokladrubští koně chovaní ve Slatiňanech?',
            o: ['Vraníci, tedy černí', 'Bělouši', 'Ryzáci', 'Hnědáci'],
            n: 'Bělouši se chovají v Kladrubech nad Labem.',
          },
          {
            q: 'Který živý lidový zvyk z Hlinecka je od roku 2010 na seznamu nehmotného dědictví UNESCO?',
            o: ['Masopustní obchůzky a masky', 'Jízda králů', 'Slovácký verbuňk', 'Východočeské loutkářství'],
          },
          {
            q: 'Z jaké horniny je tvořena Kunětická hora?',
            o: ['Ze znělce (fonolitu)', 'Z čediče', 'Ze žuly', 'Z pískovce'],
            n: 'Jde o sopečný vrch uprostřed Polabí.',
          },
          {
            q: 'Který hrad na Svitavsku vlastní dodnes město Polička?',
            o: ['Svojanov', 'Košumberk', 'Lanšperk', 'Rychmburk'],
          },
          {
            q: 'Portál zámku v Moravské Třebové z roku 1492 bývá označován za co?',
            o: [
              'Za nejstarší renesanční památku severně od Alp',
              'Za nejstarší gotický portál na Moravě',
              'Za největší renesanční portál ve střední Evropě',
              'Za nejstarší dochovanou sgrafitovou výzdobu v Čechách',
            ],
          },
          {
            q: 'Kterému zámku u Litomyšle se přezdívá „české Versailles“?',
            o: ['Nové Hrady u Litomyšle', 'Zámek Choltice', 'Zámek Heřmanův Městec', 'Zámek Slatiňany'],
          },
        ],
      },
      {
        title: 'Průmysl a technika',
        questions: [
          {
            q: 'Která firma v Semtíně vyrábí od roku 1920 výbušniny?',
            o: ['Explosia', 'Synthesia', 'Paramo', 'Východočeské chemické závody'],
          },
          {
            q: 'Jaká karosárna proslavila Vysoké Mýto?',
            o: ['Karosa, dnes Iveco Bus', 'Avia', 'Praga', 'Tatra'],
          },
          {
            q: 'Kdo ve Vysokém Mýtě roku 1895 založil kolářskou dílnu, z níž vyrostla Karosa?',
            o: ['Josef Sodomka', 'Václav Laurin', 'Václav Klement', 'Josef Walter'],
          },
          {
            q: 'Vodárna u kterého svitavského města zásobuje pitnou vodou Brno?',
            o: ['Březová nad Svitavou', 'Svitavy', 'Litomyšl', 'Moravská Třebová'],
          },
          {
            q: 'Jak se jmenuje pardubická rafinerie a výrobce maziv?',
            o: ['Paramo', 'Koramo', 'Benzina', 'Chemopetrol'],
          },
          {
            q: 'Které město v kraji je zásadním železničním uzlem s rozsáhlým seřaďovacím nádražím?',
            o: ['Česká Třebová', 'Choceň', 'Ústí nad Orlicí', 'Přelouč'],
          },
          {
            q: 'Jak se jmenuje uhelná elektrárna u Labe západně od Přelouče?',
            o: ['Chvaletice', 'Opatovice nad Labem', 'Mělník', 'Hodonín'],
          },
          {
            q: 'Jak se jmenoval velký textilní podnik v Ústí nad Orlicí?',
            o: ['Perla', 'Tepna', 'Mileta', 'Texlen'],
          },
          {
            q: 'Jak se jmenuje Gočárův komplex mlýnů v Pardubicích, otevřený roku 2023 jako kulturní centrum?',
            o: ['Automatické mlýny', 'Labské mlýny', 'Pernštýnské mlýny', 'Semtínské mlýny'],
            n: 'Také Winternitzovy mlýny, podle původních majitelů.',
          },
          {
            q: 'Který železniční inženýr zemřel roku 1845 v Pardubicích na následky nehody u chocenského tunelu?',
            o: ['Jan Perner', 'Josef Ressel', 'Vojtěch Lanna', 'Jan Kašpar'],
          },
        ],
      },
      {
        title: 'Příroda a rekordy',
        questions: [
          {
            q: 'Jak vysoký je Kralický Sněžník, nejvyšší bod kraje?',
            o: ['1 424 m n. m.', '1 220 m n. m.', '1 358 m n. m.', '1 491 m n. m.'],
          },
          {
            q: 'Která velká česká řeka pramení na Kralickém Sněžníku?',
            o: ['Morava', 'Odra', 'Orlice', 'Labe'],
          },
          {
            q: 'Socha jakého zvířete stojí pod vrcholem Kralického Sněžníku?',
            o: ['Slona', 'Medvěda', 'Vlka', 'Koně'],
            n: 'Sloní mládě je jednou z nejfotografovanějších soch v horách.',
          },
          {
            q: 'Jak se jmenuje vyhlídková věž v korunách stromů na Dolní Moravě?',
            o: ['Stezka v oblacích', 'Stezka korunami stromů', 'Nebeská stezka', 'Sky Walk'],
          },
          {
            q: 'Co se na Dolní Moravě otevřelo v roce 2022 a drží světový rekord?',
            o: [
              'Sky Bridge 721, nejdelší visutý most pro pěší',
              'Stezka v oblacích, nejvyšší dřevěná rozhledna světa',
              'Mamutíkův vodní park, největší horský aquapark',
              'Lanovka Sněžník, nejdelší kabinková lanovka v Česku',
            ],
          },
          {
            q: 'Kolik metrů měří Sky Bridge?',
            o: ['721 metrů', '516 metrů', '630 metrů', '890 metrů'],
            n: 'Délka dala mostu i jméno.',
          },
          {
            q: 'Jak se jmenuje oblíbená rekreační přehrada na Chrudimce v Železných horách?',
            o: ['Sečská přehrada', 'Křižanovice', 'Pastviny', 'Pařížov'],
          },
          {
            q: 'Jak se jmenuje pískovcové skalní město u Proseče, pojmenované po středověkém zbojníkovi?',
            o: ['Toulovcovy maštale', 'Babinského maštale', 'Lotrandovy skály', 'Vranické skály'],
          },
          {
            q: 'Ve které obci na Proseččsku se dochovala skalní obydlí vytesaná do pískovce?',
            o: ['Zderaz', 'Budislav', 'Perálec', 'Nové Hrady'],
          },
          {
            q: 'Které dvě řeky se stékají přímo v Pardubicích?',
            o: ['Labe a Chrudimka', 'Labe a Orlice', 'Labe a Loučná', 'Chrudimka a Doubrava'],
          },
        ],
      },
      {
        title: 'Litomyšlsko a Svitavsko',
        questions: [
          {
            q: 'Do kterého města zasadil Alois Jirásek děj Filosofské historie?',
            o: ['Do Litomyšle', 'Do Hradce Králové', 'Do Chrudimi', 'Do Poličky'],
          },
          {
            q: 'Který hudební festival se v Litomyšli koná od roku 1949?',
            o: ['Smetanova Litomyšl', 'Smetanovy dny', 'Litomyšlské kulturní léto', 'Festival Bedřicha Smetany'],
          },
          {
            q: 'Jak se jmenuje litomyšlský dům vyzdobený od podlahy po strop Josefem Váchalem?',
            o: ['Portmoneum', 'Dům U Rytířů', 'Váchalova síň', 'Muzeum Josefa Portmana'],
          },
          {
            q: 'Která autorka nejslavnější staročeské kuchařky prožila poslední roky života v Litomyšli?',
            o: ['Magdalena Dobromila Rettigová', 'Božena Němcová', 'Karolina Světlá', 'Marie Janků-Sandtnerová'],
          },
          {
            q: 'Který historik a pozdější ministr školství se narodil v Litomyšli roku 1878?',
            o: ['Zdeněk Nejedlý', 'Josef Pekař', 'Václav Kopecký', 'František Palacký'],
          },
          {
            q: 'Kolik bašt se dochovalo v poličském městském opevnění?',
            o: ['19', '12', '15', '23'],
          },
          {
            q: 'Který panovník založil Poličku v roce 1265?',
            o: ['Přemysl Otakar II.', 'Václav II.', 'Karel IV.', 'Jan Lucemburský'],
          },
          {
            q: 'Jaká egyptská rarita je uložena na zámku v Moravské Třebové?',
            o: ['Mumie dívky', 'Sarkofág faraona', 'Papyrus Knihy mrtvých', 'Soška boha Anubise'],
          },
          {
            q: 'Jak se přezdívá Moravské Třebové?',
            o: ['Moravské Athény', 'Moravský Betlém', 'Moravská Florencie', 'Moravské Benátky'],
          },
          {
            q: 'Kterému umělému jazyku je věnována stálá expozice muzea ve Svitavách?',
            o: ['Esperantu', 'Volapüku', 'Interlingue', 'Idu'],
          },
        ],
      },
      {
        title: 'Orlickoústecko',
        questions: [
          {
            q: 'Ve které obci v Orlických horách byla roku 1457 založena Jednota bratrská?',
            o: ['Kunvald', 'Klášterec nad Orlicí', 'Litice nad Orlicí', 'Žamberk'],
          },
          {
            q: 'Jak se jmenuje mezinárodní houslová soutěž mladých hudebníků v Ústí nad Orlicí?',
            o: ['Kocianova houslová soutěž', 'Beethovenův Hradec', 'Concertino Praga', 'Heranova soutěž'],
          },
          {
            q: 'Po kterém houslistovi, rodákovi z Ústí nad Orlicí, je pojmenovaná?',
            o: ['Jaroslav Kocian', 'Jan Kubelík', 'František Ondříček', 'Josef Suk'],
          },
          {
            q: 'Jaká románská rotunda stojí v České Třebové?',
            o: ['Rotunda svaté Kateřiny', 'Rotunda svatého Jiří', 'Rotunda svatého Martina', 'Rotunda svatého Víta'],
          },
          {
            q: 'Čemu je věnováno velké muzeum v Letohradě?',
            o: ['Řemeslům', 'Hasičské technice', 'Železnici', 'Lidovým krojům'],
          },
          {
            q: 'Jaká dělostřelecká tvrz předválečného opevnění se dá navštívit u Králík?',
            o: ['Tvrz Hůrka', 'Tvrz Dobrošov', 'Tvrz Stachelberg', 'Tvrz Smolkov'],
          },
          {
            q: 'Jak se jmenuje barokní poutní areál na kopci nad Králíky?',
            o: ['Hora Matky Boží', 'Svatý Kopeček', 'Zelená hora', 'Svatý Hostýn'],
          },
          {
            q: 'Které dvě dochované brány (plus Choceňská věž) hlídají historické jádro Vysokého Mýta?',
            o: ['Pražská a Litomyšlská', 'Pražská a Chrudimská', 'Choceňská a Litomyšlská', 'Vídeňská a Pražská'],
          },
          {
            q: 'Ve které obci u Vysokého Mýta došlo roku 1108 k vyvraždění Vršovců?',
            o: ['Vraclav', 'Libice nad Cidlinou', 'Sezemice', 'Choceň'],
          },
          {
            q: 'Jak se jmenuje kopec s rozhlednou nad Ústím nad Orlicí?',
            o: ['Andrlův chlum', 'Kozlovský kopec', 'Suchý vrch', 'Kunětická hora'],
          },
        ],
      },
      {
        title: 'Chrudimsko a Železné hory',
        questions: [
          {
            q: 'Jaké muzeum sídlí v renesančním Mydlářovském domě v Chrudimi?',
            o: ['Muzeum loutkářských kultur', 'Muzeum barokních soch', 'Regionální muzeum v Chrudimi', 'Muzeum hraček'],
          },
          {
            q: 'Jak se jmenuje tradiční celostátní přehlídka amatérského loutkového divadla v Chrudimi?',
            o: ['Loutkářská Chrudim', 'Jiráskův Hronov', 'Wolkerův Prostějov', 'Šrámkův Písek'],
          },
          {
            q: 'Jaká je tradiční přezdívka Chrudimi?',
            o: ['Athény východních Čech', 'Perla Železných hor', 'Východočeská Florencie', 'Malý Řím'],
          },
          {
            q: 'Jak se jmenuje skanzen lidových staveb u Hlinska?',
            o: ['Veselý Kopec', 'Zubrnice', 'Přerov nad Labem', 'Rožnov pod Radhoštěm'],
          },
          {
            q: 'Jak se jmenuje památková rezervace roubených domků přímo v Hlinsku?',
            o: ['Betlém', 'Jeruzalém', 'Na Kopečku', 'Staré Hlinsko'],
          },
          {
            q: 'Jaká hornina se odjakživa těží a zpracovává ve Skutči?',
            o: ['Žula', 'Vápenec', 'Pískovec', 'Čedič'],
          },
          {
            q: 'U které obce na Nasavrcku leželo keltské oppidum?',
            o: ['České Lhotice', 'Závist', 'Stradonice', 'Hrazany'],
          },
          {
            q: 'Zřícenina kterého hradu se tyčí nad Sečskou přehradou?',
            o: ['Oheb', 'Lichnice', 'Strádov', 'Rabštejnek'],
          },
          {
            q: 'Jak se jmenuje zřícenina hradu nad Třemošnicí, jedna z dominant Železných hor?',
            o: ['Lichnice', 'Oheb', 'Rabštejnek', 'Košumberk'],
          },
          {
            q: 'Na řece Doubravě u Běstviny stojí jedna z nejstarších přehrad v Česku. Jak se jmenuje?',
            o: ['Pařížov', 'Seč', 'Křižanovice', 'Hamry'],
          },
        ],
      },
      {
        title: 'Historie a temné kapitoly',
        questions: [
          {
            q: 'Která osada na Chrudimsku byla 24. června 1942 vypálena nacisty?',
            o: ['Ležáky', 'Lidice', 'Javoříčko', 'Ploština'],
          },
          {
            q: 'Kolik ležáckých dětí přežilo a jak se jmenovaly?',
            o: [
              'Dvě – sestry Šťulíkovy',
              'Tři – bratři Sýkorovi',
              'Jedno – chlapec Pelikán',
              'Čtyři – sourozenci Hudcovi',
            ],
          },
          {
            q: 'Jaká parašutistická vysílačka byla v Ležákách ukrytá?',
            o: ['Libuše', 'Božena', 'Vlasta', 'Anežka'],
            n: 'Vysílačka výsadku Silver A.',
          },
          {
            q: 'Čím jsou v Ležákách označena místa zbořených domů?',
            o: ['Žulovými balvany', 'Bronzovými deskami', 'Betonovými obrysy základů', 'Dřevěnými kříži'],
          },
          {
            q: 'Který šlechtic koupil roku 1491 pardubické panství a dal městu renesanční podobu?',
            o: ['Vilém z Pernštejna', 'Vratislav z Pernštejna', 'Jan z Pernštejna', 'Zdeněk Lev z Rožmitálu'],
          },
          {
            q: 'Co má rod Pernštejnů v erbu?',
            o: [
              'Zubří hlavu s houžví v nozdrách',
              'Stříbrnou růži na červeném poli',
              'Zlatého lva se dvěma ocasy',
              'Černou orlici se zlatou korunou',
            ],
          },
          {
            q: 'Jaká je přední polovina zvířete v pardubickém znaku a s obléháním kterého města ji spojuje legenda?',
            o: [
              'Kůň, obléhání Milána',
              'Kůň, obléhání Vídně',
              'Jelen, obléhání Milána',
              'Kůň, bitva u Kresčaku',
            ],
            n: 'Legenda míří k obléhání Milána roku 1158.',
          },
          {
            q: 'Jaké rčení o kráse a lesku se váže k Pardubicím?',
            o: ['„Skví se jako Pardubice“', '„Září jako Pardubice“', '„Sladké jako Pardubice“', '„Bohaté jako Pardubice“'],
          },
          {
            q: 'Který moravský velmož nechal přestavět zámek v Moravské Třebové a po Bílé hoře přišel o majetek?',
            o: ['Ladislav Velen ze Žerotína', 'Karel starší ze Žerotína', 'Albrecht z Valdštejna', 'Petr Vok z Rožmberka'],
          },
          {
            q: 'Který spis napsal Jan Amos Komenský v úkrytu v Brandýse nad Orlicí?',
            o: ['Labyrint světa a ráj srdce', 'Didaktiku velkou', 'Orbis pictus', 'Kšaft umírající matky Jednoty bratrské'],
          },
        ],
      },
      {
        title: 'Mix a kuriozity',
        questions: [
          {
            q: 'Jakou ochranu má na evropské úrovni „Pardubický perník“?',
            o: [
              'Chráněné zeměpisné označení',
              'Chráněné označení původu',
              'Zaručená tradiční specialita',
              'Národní kulturní památka',
            ],
          },
          {
            q: 'Jak se jmenuje lázeňské město u Pardubic, kde se léčí rašelinnými zábaly?',
            o: ['Lázně Bohdaneč', 'Lázně Bělohrad', 'Poděbrady', 'Lázně Toušeň'],
          },
          {
            q: 'Který architekt navrhl lázeňskou budovu v Lázních Bohdaneč?',
            o: ['Josef Gočár', 'Jan Kotěra', 'Pavel Janák', 'Dušan Jurkovič'],
          },
          {
            q: 'Jak se jmenuje tradiční pardubický letecký festival?',
            o: ['Aviatická pouť', 'Dny NATO', 'Letecký den Pardubice', 'Aviatický víkend'],
          },
          {
            q: 'Kdo v květnu 1911 uskutečnil první dálkový přelet z Pardubic do Prahy?',
            o: ['Jan Kašpar', 'Evžen Čihák', 'Božena Laglerová', 'Metoděj Vlach'],
          },
          {
            q: 'Pod jakým názvem získal pardubický hokejový klub v roce 1973 svůj první mistrovský titul?',
            o: ['Tesla Pardubice', 'RH Pardubice', 'TJ Dynamo Pardubice', 'HC Pardubice'],
          },
          {
            q: 'Jak se jmenuje profesionální divadelní scéna v Pardubicích?',
            o: ['Východočeské divadlo', 'Městské divadlo Pardubice', 'Divadlo Pernštejn', 'Divadlo Jana Pernera'],
          },
          {
            q: 'Po kom je pojmenovaná dopravní fakulta Univerzity Pardubice?',
            o: ['Po Janu Pernerovi', 'Po Josefu Resslovi', 'Po Janu Kašparovi', 'Po Františku Křižíkovi'],
          },
          {
            q: 'S kterým státem sousedí Pardubický kraj na severovýchodě?',
            o: ['S Polskem', 'S Německem', 'Se Slovenskem', 'S Rakouskem'],
            n: 'Hranice vede Králickem.',
          },
          {
            q: 'Jak se jmenují barokní zahrady u piaristického chrámu v Litomyšli, upravené na přelomu tisíciletí Josefem Pleskotem?',
            o: ['Klášterní zahrady', 'Zámecké zahrady', 'Piaristické zahrady', 'Smetanovy sady'],
          },
        ],
      },
    ],
  },
}
